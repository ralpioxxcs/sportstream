import { Injectable } from '@nestjs/common';
import { GithubLoginDto } from '../dtos/github-login.dto';

@Injectable()
export class GithubService {
  constructor() {}

  async getProfileByToken(loginDto: GithubLoginDto) {}
}
