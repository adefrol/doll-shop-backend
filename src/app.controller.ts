import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express'
import { write } from 'fs'
import { Express } from 'express'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

}
