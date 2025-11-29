import Image from 'next/image'

interface AppLogoProps {
  width: string
}

const AppLogo = ({width}: AppLogoProps) => {
  return (
    <div style={{width}}>
      <Image
        quality="75"
        width={567}
        height={150}
        src='/images/logoApp.webp'
        alt="Dreamer"
        sizes="20vw"
        style={{width: '100%', height: 'auto'}}
        priority
      />
    </div>
  )
}

export default AppLogo