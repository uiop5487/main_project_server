import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import {
  PointCharge,
  POINT_TRANSACTION_STATUS_ENUM,
} from '../pointCharge/entities/pointCharge.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class IamportService {
  constructor(
    @InjectRepository(PointCharge)
    private readonly pointChargeRepository: Repository<PointCharge>, //
  ) {}

  async createrIamportAccessToken() {
    const result = await axios({
      url: 'https://api.iamport.kr/users/getToken',
      method: 'post', // POST method
      headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
      data: {
        imp_key: process.env.IMP_KEY, // REST API키
        imp_secret: process.env.IMP_SECRET, // REST API Secret
      },
    });

    return result.data.response.access_token;
  }

  async checkPayment({ token, impUid }) {
    const result = axios
      .get(`https://api.iamport.kr/payments/${impUid}`, {
        headers: {
          Authorization: `Bearer ${token}`, // 발행된 액세스 토큰
        },
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error.response.data.message;
      });

    return result;
  }

  async cancelPayment({ impUid, token }) {
    try {
      const result = await this.checkPayment({ token, impUid });

      if (result.data.response.status === 'cancelled')
        throw new UnprocessableEntityException('이미 환불 되었습니다.');

      const cancelData = await axios({
        url: 'https://api.iamport.kr/payments/cancel',
        method: 'post',
        headers: {
          Authorization: token, // 아임포트 서버로부터 발급받은 엑세스 토큰
        },
        data: {
          reason: '아무이유 없음', // 가맹점 클라이언트로부터 받은 환불사유
          imp_uid: impUid, // imp_uid를 환불 `unique key`로 입력
          amount: result.data.response.amount, // 가맹점 클라이언트로부터 받은 환불금액
        },
      });

      return cancelData.data.response.amount;
    } catch (error) {
      throw new Error(error);
    }
  }
}
