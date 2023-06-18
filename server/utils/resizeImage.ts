import sharp from "sharp";
import path from "path";
export const resizeImage = async (item: any) => {
    const imageId = item.croppedImage_id;
    const imagePath = path.resolve("public/images/points") + '\\';
    await sharp(imagePath + item.image_id + "." + item.image_extension)
        .resize(400, 400)
        .toFile(imagePath + imageId + "." + item.image_extension);
};
