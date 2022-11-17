import type { NextPage } from 'next'
import Head from 'next/head'
import { GetStaticPropsContext } from 'next'
import { Nunito } from '@next/font/google'
import { useUser } from '@auth0/nextjs-auth0'
import { Dropdown } from '../components/Dropdown'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/20/solid'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Timeline } from '../components/Timeline'

const nunito = Nunito({
  weight: '400',
})

let demoArray: SessionArray
demoArray = [
    { "index": 232, "startTime": new Date("2022-11-16T09:13:20"), "endTime": new Date("2022-11-16T11:34:40"), "ongoing": false },
    { "index": 234, "startTime": new Date("2022-11-16T17:20:20"), "endTime": new Date("2022-11-16T18:30:40"), "ongoing": false }
]

const Home: NextPage = () => {
  const { user, error, isLoading } = useUser();
  const t = useTranslations('Home');

  return (
    <div>
      <Head>
        <title>{t('caption')}</title>
        <link rel="icon" href="/icon_32.png" sizes="32x32" />
        <link rel="icon" href="/icon_128.png" sizes="128x128" />
        <link rel="icon" href="/icon_150.png" sizes="150x150" />
        <link rel="icon" href="/icon_180.png" sizes="180x180" />
        <link rel="icon" href="/icon_192.png" sizes="192x192" />
      </Head>

      <nav className="bg-slate-800 p-1 mt-0 fixed w-full z-10 pin-t shadow-md">
        <div className="container mx-auto flex flex-wrap md:flex-nowrap items-center">

          <div className="flex w-full md:w-1/2 justify-center md:justify-start">
            <a className="text-white flex no-underline hover:text-white hover:no-underline" href="#">
              <img className="inline w-12 h-12 md:w-16 md:h-16" src="/icon_128.png" />
              <div className="text-xl md:text-2xl pl-4">
                <p className="pt-3 md:pt-4"><span className={nunito.className}>{t('caption')}</span></p>
              </div>
            </a>
          </div>

          {user && !isLoading &&
            <Dropdown userName={user?.name} picture={user?.picture} />
          }
          {!user && !isLoading &&
            <div className="flex w-full pt-2 content-center justify-center md:w-1/2 md:justify-end">
              <Link href="/api/auth/login" passHref>
                <button className="flex items-center mx-2 my-2 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-indigo-600" type="button">
                  <ArrowLeftOnRectangleIcon className='h-5 w-5 rotate-180 mr-2' />
                  <span>Login</span>
                </button>
              </Link>
            </div>
          }
          {isLoading &&
            <div className="flex w-full pt-2 content-center justify-center mb-2 md:mb-0 md:w-1/2 md:justify-end">
              <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
          }
        </div>

      </nav>

      <div className="min-h-screen bg-cover bg-no-repeat bg-fixed bg-center bg-[url('/background.jpg')]">
        <div className="absolute inset-0 bg-gradient-to-t to-transparent via-transparent from-slate-800 block"></div>
        {// <div className="flex h-screen bg-cover bg-top bg-[url('/background.jpg')]">
        }

        <div className="h-screen flex items-center justify-center place-items-center z-10">
          <div className="container bg-slate-800 bg-opacity-75 p-2 md:p-5 mt-[80px] mb-5">
            <div className="text-white">
              <p>{t('today')}</p>
            </div>

            <Timeline currentTime={new Date("2022-11-16T11:01:01")} sessions={demoArray} showTime={true} textColor="text-white" barColor="bg-sky-700" lineColor="bg-gray-300" curTimeColor="bg-teal-500" showCurrentTime={true}></Timeline>
            <div className="mt-8 mb-6 text-white">
              <p>{t('past6')}</p>
            </div>
            <Timeline currentTime={new Date("2022-11-15T11:01:01")} sessions={demoArray} showTime={false} textColor="text-white" barColor="bg-sky-700" lineColor="bg-gray-300" curTimeColor="bg-teal-500" showCurrentTime={false}></Timeline>
            <Timeline currentTime={new Date("2022-11-14T11:01:01")} sessions={demoArray} showTime={false} textColor="text-white" barColor="bg-sky-700" lineColor="bg-gray-300" curTimeColor="bg-teal-500" showCurrentTime={false}></Timeline>
            <Timeline currentTime={new Date("2022-11-13T11:01:01")} sessions={demoArray} showTime={false} textColor="text-white" barColor="bg-sky-700" lineColor="bg-gray-300" curTimeColor="bg-teal-500" showCurrentTime={false}></Timeline>
            <Timeline currentTime={new Date("2022-11-12T11:01:01")} sessions={demoArray} showTime={false} textColor="text-white" barColor="bg-sky-700" lineColor="bg-gray-300" curTimeColor="bg-teal-500" showCurrentTime={false}></Timeline>
            <Timeline currentTime={new Date("2022-11-11T11:01:01")} sessions={demoArray} showTime={false} textColor="text-white" barColor="bg-sky-700" lineColor="bg-gray-300" curTimeColor="bg-teal-500" showCurrentTime={false}></Timeline>
            <Timeline currentTime={new Date("2022-11-10T11:01:01")} sessions={demoArray} showTime={true} textColor="text-white" barColor="bg-sky-700" lineColor="bg-gray-300" curTimeColor="bg-teal-500" showCurrentTime={false}></Timeline>
            
          </div>
        </div>
      </div>

      <footer className="bg-slate-800 w-full fixed bottom-0">
        <div className="container mx-auto flex flex-wrap items-center justify-items-center">
          <div className="flex flex-auto justify-items-center justify-center">
            <p className="pb-2 text-white">&copy; 2022 by Andreas Hauser</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home

export async function getStaticProps({locale}: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../locales/${locale}.json`)).default
    }
  };
}
