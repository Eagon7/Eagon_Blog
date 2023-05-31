import { UseInterceptors, applyDecorators } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'

type uploadType = 'image' | 'video' | 'audio' | 'document'

export let fileFilter = (type: uploadType) => {
  return (req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
    if (!file.mimetype.includes(type)) callback(new Error('类型不允许'), false)
    callback(null, true)
  }
}

export function upload(filename = 'file', options: MulterOptions) {
  return applyDecorators(UseInterceptors(FileInterceptor(filename, options)))
}

export function Image(file = 'file') {
  return upload(file, {
    // limits 范围
    limits: { fieldSize: 1024 * 2 },
    // 中间件会调用fileFilter方法，传递req、file、callback三个参数
    fileFilter: fileFilter('image'),
  })
}
