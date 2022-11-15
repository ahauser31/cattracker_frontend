import type { NextPage } from 'next'
import Head from 'next/head'
import { GetStaticPropsContext } from 'next'
import { Nunito } from '@next/font/google'
import { useUser } from '@auth0/nextjs-auth0'
import { Dropdown } from '../components/Dropdown'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/20/solid'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

const nunito = Nunito({
  weight: '400',
})

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

        <div className="h-screen flex items-center justify-center place-items-center">
          <div className="container bg-slate-800 bg-opacity-75 p-2 md:p-5">
            <div className="text-white">
              <p>{t('today')}</p>
            </div>

            <table className="auto timeline w-full">
              <tbody>
                <tr>
                  <td className="pr-2 md:pr-3 text-right">Mon</td>

                  <td className="slot">
                    <div className="bg-gray-200 h-0.5 w-full relative">
                    </div>
                  </td>
                  <td className="slot">
                    <div className="bg-gray-200 h-0.5 w-full relative">
                    </div>
                  </td>
                  <td className="slot">
                    <div className="bg-gray-200 h-0.5 w-full relative">
                    </div>
                  </td>
                  <td className="slot">
                    <div className="bg-gray-200 h-0.5 w-full relative">
                    </div>
                  </td>
                  <td className="slot">
                    <div className="bg-gray-200 h-0.5 w-full relative">
                    </div>
                  </td>
                  <td className="slot">
                    <div className="bg-gray-200 h-0.5 w-full relative">
                    </div>
                  </td>

                  <td className="slot">
                    <div className="bg-gray-200 h-0.5 w-full z-0 relative">
                      <div className="bg-indigo-700 w-full h-6 z-1 absolute top-1/2 transform -translate-y-1/2">
                      </div>
                    </div>
                    
                  </td>

                  <td className="slot">
                    <div className="bg-gray-200 h-0.5 w-full">
                      <div className="w-full relative flex justify-end">
                        <div className="bg-indigo-700 w-1/5 h-6 z-1 absolute top-1/2 transform -translate-y-1/2 rounded-r-lg"></div>
                      </div>
                      <div className="w-full relative flex justify-start">
                        <div className="bg-indigo-700 w-1/5 h-6 z-1 absolute top-1/2 transform -translate-y-1/2 rounded-l-lg"></div>
                      </div>
                    </div>
                  </td>
                  <td className="slot">
                    <div className="bg-gray-200 h-0.5 w-full relative">
                    </div>
                  </td>
                  <td className="slot">
                    <div className="bg-gray-200 h-0.5 w-full relative">
                    </div>
                  </td>
                  <td className="slot">
                    <div className="bg-gray-200 h-0.5 w-full">
                      <div className="w-full relative flex justify-end">
                        <div className="bg-indigo-700 w-1/5 h-6 z-1 absolute top-1/2 transform -translate-y-1/2 rounded-r-lg"></div>
                      </div>
                      
                    </div>
                  </td>
                  <td className="slot">
                    <div className="bg-gray-200 h-0.5 w-full relative">
                    </div>
                  </td>
                  <td className="slot">
                    <div className="bg-gray-200 h-0.5 w-full relative">
                    </div>
                  </td>

                  <td className="pl-2 md:pl-3 text-left">Tue</td>
                </tr>

                <tr>
                  <td className="pr-2 md:pr-3 text-right"></td>
                  
                  <td className="md:pr-2 md:pl-2 text-center">00</td>
                  <td className="md:pr-2 md:pl-2 text-center">02</td>
                  <td className="md:pr-2 md:pl-2 text-center">04</td>
                  <td className="md:pr-2 md:pl-2 text-center">06</td>
                  <td className="md:pr-2 md:pl-2 text-center">08</td>
                  <td className="md:pr-2 md:pl-2 text-center">10</td>
                  <td className="md:pr-2 md:pl-2 text-center">12</td>
                  <td className="md:pr-2 md:pl-2 text-center">14</td>
                  <td className="md:pr-2 md:pl-2 text-center">16</td>
                  <td className="md:pr-2 md:pl-2 text-center">18</td>
                  <td className="md:pr-2 md:pl-2 text-center">20</td>
                  <td className="md:pr-2 md:pl-2 text-center">22</td>
                  <td className="md:pr-2 md:pl-2 text-center">24</td>
                  
                  <td className="pl-2 md:pl-3 text-left"></td>
                </tr>
              </tbody>
            </table>
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
