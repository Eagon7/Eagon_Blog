import { Module } from '@nestjs/common'
import { UploadService } from './upload.service'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory() {
        return {
          storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
              const path = Date.now() + '-' + Math.round(Math.random() * 1e9)
              cb(null, path)
            },
          }),
        }
      },
    }),
  ],
  providers: [UploadService],
})
export class UploadModule {}
