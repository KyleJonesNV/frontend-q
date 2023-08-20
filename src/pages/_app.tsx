import { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
    // Remove #!/ for fixing s3 routing issue
    const router = useRouter();
    const path = (/#!(\/.*)$/.exec(router.asPath) || [])[1];
    if (path) {
      router.replace(path);
    }
  
  return <Component {...pageProps} />
}
