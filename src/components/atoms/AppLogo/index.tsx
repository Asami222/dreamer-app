import Image from 'next/image'

interface AppLogoProps {
  width: string
}

const AppLogo = ({width}: AppLogoProps) => {
  return (
    <div style={{width}}>
      <Image
        width={567}
        height={150}
        src='/images/logoApp.webp'
        alt="Dreamer"
        sizes={width}
        style={{width: '100%', height: 'auto'}}
      />
    </div>
  )
}

export default AppLogo