/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Фото из /uploads/ отдаются готовыми уменьшенными копиями (lib/image-variants.ts)
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
  },
}

export default nextConfig
