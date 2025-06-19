import exifr from 'exifr'

/**
 * 根据 EXIF 信息校正图片方向
 * @param file 原始图片文件
 * @returns Promise<File> 校正后的图片文件
 */
export const correctImageOrientation = async (file: File): Promise<File> => {
  try {
    // 读取 EXIF 信息
    const exif = await exifr.parse(file)
    let orientation = exif?.Orientation || 1

    // 创建图片对象
    const img = new Image()
    img.src = URL.createObjectURL(file)

    return new Promise((resolve, reject) => {
      img.onload = () => {
        // 创建 canvas
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Failed to get canvas context'))
          return
        }

        // 根据 EXIF 方向信息设置 canvas 尺寸
        let width = img.width
        let height = img.height
        if (orientation > 4) {
          [width, height] = [height, width]
        }
        canvas.width = width
        canvas.height = height

        // 根据方向信息旋转图片
        ctx.save()
        switch (orientation) {
          case 2: ctx.transform(-1, 0, 0, 1, width, 0); break
          case 3: ctx.transform(-1, 0, 0, -1, width, height); break
          case 4: ctx.transform(1, 0, 0, -1, 0, height); break
          case 5: ctx.transform(0, 1, 1, 0, 0, 0); break
          case 6: ctx.transform(0, 1, -1, 0, height, 0); break
          case 7: ctx.transform(0, -1, -1, 0, height, width); break
          case 8: ctx.transform(0, -1, 1, 0, 0, width); break
        }

        // 绘制图片
        ctx.drawImage(img, 0, 0)
        ctx.restore()

        // 将 canvas 转换为 Blob
        canvas.toBlob((blob) => {
          if (blob) {
            // 创建新的 File 对象
            const correctedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: file.lastModified
            })
            resolve(correctedFile)
          } else {
            reject(new Error('Failed to create blob'))
          }
        }, file.type)
      }

      img.onerror = () => {
        reject(new Error('Failed to load image'))
      }
    })
  } catch (error) {
    console.error('Failed to process image orientation:', error)
    // 如果处理失败，返回原始文件
    return file
  }
} 