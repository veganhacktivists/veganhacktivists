import { FormattedMessage, useIntl } from 'react-intl';

import ACCLogo from '../../../../../public/images/yearInReview/2023/animal-advocacy-careers.png';
import SGILogo from '../../../../../public/images/yearInReview/2023/stray-dog-institute.png';

import { SectionHeader } from 'components/decoration/textBlocks';
import CustomImage from 'components/decoration/customImage';
import SquareField from 'components/decoration/squares';

const Collaborations: React.FC = () => {
  const intl = useIntl();

  const TOP_DECORATION_SQUARES = [
    { color: 'pink-dark', size: 16, right: 0, bottom: 0 },
  ];

  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className='hidden md:block'
      />
      <div className='py-10 md:py-20 px-5 md:px-10'>
        <div className='max-w-6xl mx-auto text-2xl sm:text-4xl pb-10'>
          <FormattedMessage
            id='page.year-in-review.2023.section.collaborations.header'
            defaultMessage='2023 was marked by collaborations that focused on arguably one of the most important building blocks in the movement: <b>acquiring and cultivating talent and skill</b>.'
            values={{
              b: (chunks) => <b>{chunks}</b>,
            }}
          />
        </div>

        <div className='max-w-screen-2xl mx-auto flex flex-col gap-10'>
          <div className='flex flex-col lg:grid lg:grid-cols-3 gap-10'>
            <div className='text-lg text-left lg:col-span-2'>
              <div className='flex items-center mb-5'>
                <div className='bg-green flex items-center justify-center text-3xl md:text-7xl text-white font-bold font-mono w-10 md:w-20 h-10 md:h-20 p-3 mr-3 md:mr-10'>
                  1
                </div>
                <SectionHeader
                  header={intl.formatMessage({
                    id: 'page.year-in-review.2023.section.collaborations.1.heading',
                    defaultMessage:
                      'Collaboration for <b>EFFECTIVE REDIRECTION</b>',
                  })}
                  smallOnMobile={true}
                  stackEntries
                />
              </div>
              <FormattedMessage
                id='page.year-in-review.2023.section.collaborations.1.content'
                defaultMessage="This year, we partnered with <no-localization>AAC</no-localization> by winding down their skilled volunteer board's activities and guiding those eager to volunteer or seeking volunteer positions towards <no-localization>VH Playground</no-localization>. Likewise, <no-localization>Playground</no-localization> began to advocate <no-localization>AAC's</no-localization> career opportunities within our volunteer community for individuals aspiring to pursue a more career-oriented role."
                values={{
                  b: (chunks) => <b>{chunks}</b>,
                  break: <br />,
                }}
              />
            </div>
            <div className='bg-[#F1F1F1] p-10 flex items-center justify-center max-w-xl mx-auto w-full'>
              <CustomImage alt='Animal Advocacy Careers' src={ACCLogo} />
            </div>
          </div>
          <div className='flex flex-col lg:grid lg:grid-cols-3 gap-10'>
            <div className='text-lg text-left lg:col-span-2'>
              <div className='flex items-center mb-5'>
                <div className='bg-yellow-orange flex items-center justify-center text-3xl md:text-7xl text-white font-bold font-mono w-10 md:w-20 h-10 md:h-20 p-3 mr-3 md:mr-10'>
                  2
                </div>
                <SectionHeader
                  header={intl.formatMessage({
                    id: 'page.year-in-review.2023.section.collaborations.2.heading',
                    defaultMessage:
                      'Partnership for <b>ADVANCED CONVERSATIONS</b>',
                  })}
                  smallOnMobile={true}
                  stackEntries
                />
              </div>
              <FormattedMessage
                id='page.year-in-review.2023.section.collaborations.2.content'
                defaultMessage='We partnered with <no-localization>Sentient Media’s Writers’ Collective</no-localization> to train and mentor new writers focused on topics like animal welfare, plant-based diets, social justice, and the environment. By guiding almost 200+ writer applicants to their program, we support enriching these important conversations.'
                values={{
                  b: (chunks) => <b>{chunks}</b>,
                  break: <br />,
                }}
              />
            </div>
            <div className='bg-[#F1F1F1] p-10 flex items-center justify-center max-w-xl mx-auto w-full'>
              <svg
                width='397'
                height='76'
                viewBox='0 0 397 76'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g clip-path='url(#clip0_4310_696)'>
                  <path
                    d='M9.82117e-05 52.845C0.354362 52.845 0.60265 52.845 0.84791 52.845C5.13542 52.845 9.42292 52.854 13.7104 52.8329C14.2524 52.8329 14.4795 52.9806 14.6491 53.5141C15.8875 57.4627 18.8124 59.7204 22.6034 60.8869C26.8333 62.189 31.1663 62.4331 35.5174 61.3872C37.1524 60.9954 38.624 60.287 39.9532 59.226C42.5451 57.1553 43.0659 51.1842 38.8632 48.9778C36.3137 47.6364 33.5734 46.91 30.7757 46.3735C24.5685 45.1799 18.5763 43.2568 12.8051 40.749C7.82722 38.5848 4.13621 34.9919 2.90991 29.5332C1.71086 24.195 1.8774 18.9172 4.7751 14.0251C6.89765 10.4442 10.0558 8.00877 13.8679 6.53182C21.9039 3.42117 30.1792 2.6646 38.5483 4.96443C47.0627 7.30647 53.0307 13.7327 54.254 22.6186C54.363 23.4113 54.4538 24.2041 54.5628 25.0631H40.7889C40.7163 24.7195 40.6436 24.3548 40.5588 23.9961C39.7231 20.5509 37.3553 18.5313 34.1124 17.5457C29.8098 16.2345 25.4556 16.2586 21.1863 17.7687C19.0395 18.5283 17.2864 19.8154 16.7171 22.1785C15.9753 25.259 17.2016 27.7457 20.1962 29.3342C23.2211 30.9378 26.4821 31.9174 29.8037 32.6408C34.3607 33.6295 38.8753 34.7507 43.2809 36.2729C45.5942 37.0717 47.8167 38.0875 49.8333 39.4891C53.2033 41.8281 55.2653 45.0201 55.9405 49.0531C56.643 53.2519 56.4492 57.4115 54.9322 61.4234C53.0701 66.3546 49.5032 69.7154 44.7858 71.9459C41.0039 73.7334 36.9738 74.5984 32.8286 74.9089C27.1149 75.3369 21.4891 74.8335 16.0722 72.8683C7.2065 69.6552 1.82592 63.476 0.1848 54.1742C0.11213 53.7643 0.066712 53.3514 -0.00292969 52.851L9.82117e-05 52.845Z'
                    fill='black'
                  />
                  <path
                    d='M291.738 52.4682H256.121C256.351 57.2366 259.482 61.9388 264.817 62.8913C267.539 63.3765 270.237 63.3102 272.895 62.4994C275.1 61.8272 276.917 60.6698 277.925 58.4966C277.997 58.3398 278.261 58.174 278.433 58.174C282.821 58.165 287.208 58.1801 291.596 58.1921C291.617 58.1921 291.638 58.2162 291.714 58.2584C291.22 60.5553 290.43 62.7586 289.179 64.7812C286.633 68.9016 282.994 71.6867 278.424 73.23C272.169 75.3429 265.789 75.5569 259.433 73.8268C252.33 71.8947 247.328 67.4487 244.485 60.6577C242.386 55.6512 242.005 50.4125 242.42 45.0804C242.692 41.5748 243.528 38.1959 245.108 35.0431C248.53 28.2129 253.965 23.8333 261.474 22.1574C266.24 21.0934 271.045 21.0964 275.772 22.4347C280.883 23.8815 284.931 26.8294 287.911 31.2361C290.681 35.3355 291.953 39.908 292.141 44.7669C292.235 47.1813 291.956 49.6107 291.838 52.0341C291.832 52.1547 291.783 52.2692 291.735 52.4651L291.738 52.4682ZM278.942 42.7293C278.954 42.5786 278.972 42.5002 278.963 42.4279C278.918 42.0541 278.882 41.6803 278.818 41.3096C278.167 37.5268 276.126 34.7718 272.49 33.4335C269.389 32.2911 266.183 32.3936 263.064 33.4486C258.973 34.8321 256.536 38.8711 256.442 42.7293H278.945H278.942Z'
                    fill='black'
                  />
                  <path
                    d='M113.882 52.4619H78.1048C78.1775 52.9985 78.2108 53.4596 78.3077 53.9087C79.1282 57.7307 81.0237 60.8233 84.8055 62.2792C88.76 63.7983 92.7719 63.4999 96.6477 61.8331C98.1222 61.2001 99.182 60.0547 99.945 58.635C100.06 58.421 100.372 58.1768 100.593 58.1768C104.905 58.1527 109.216 58.1648 113.528 58.1678C113.577 58.1678 113.622 58.1949 113.776 58.2462C113.734 58.4632 113.701 58.6953 113.646 58.9214C111.866 65.9957 107.433 70.7461 100.599 73.1755C93.8862 75.5627 87.031 75.623 80.2607 73.4347C73.1996 71.153 68.4307 66.3182 66.0871 59.3765C63.4104 51.4552 63.4588 43.4434 66.8955 35.7452C70.4503 27.7787 76.7725 23.1579 85.4596 21.8136C89.3595 21.2077 93.2594 21.262 97.0928 22.2325C104.157 24.026 109.12 28.3544 112.023 34.9555C114.479 40.5378 114.773 46.3853 113.889 52.4619H113.882ZM101.032 42.717C100.853 39.3863 99.6059 36.6585 96.9202 34.6751C94.3828 32.8003 91.4427 32.5109 88.4178 32.731C83.337 33.1017 79.758 36.1792 78.6468 41.0894C78.5287 41.6108 78.4863 42.1504 78.4046 42.717H101.026H101.032Z'
                    fill='black'
                  />
                  <path
                    d='M350.497 74.246H336.605C336.605 73.9174 336.605 73.625 336.605 73.3327C336.605 64.8567 336.642 56.3838 336.578 47.9079C336.563 45.8402 336.397 43.7363 335.988 41.7137C335.4 38.7809 334.101 36.1706 331.179 34.8172C329.027 33.8195 326.716 33.7864 324.433 34.2355C319.549 35.197 316.918 38.4825 315.792 43.046C315.298 45.0444 315.08 47.1544 315.059 49.2161C314.977 57.2127 315.026 65.2124 315.026 73.2121C315.026 73.5105 315.026 73.8119 315.026 74.1736H301.2V22.3837C301.412 22.3716 301.654 22.3445 301.894 22.3445C305.727 22.3445 309.56 22.3596 313.394 22.3264C314.045 22.3204 314.193 22.5675 314.241 23.1402C314.369 24.6383 314.55 26.1303 314.72 27.6224C314.738 27.7881 314.805 27.9509 314.853 28.1408C315.764 27.2968 316.594 26.4197 317.536 25.6812C320.122 23.6527 323.098 22.4862 326.326 21.9074C329.817 21.2805 333.284 21.2895 336.757 22.0702C341.953 23.2397 345.435 26.4619 347.672 31.1128C349.198 34.2837 349.931 37.6988 350.237 41.1862C350.413 43.2058 350.476 45.2403 350.482 47.2689C350.507 55.9438 350.494 64.6186 350.494 73.2965V74.249L350.497 74.246Z'
                    fill='black'
                  />
                  <path
                    d='M172.563 74.2308H158.662C158.662 73.9173 158.662 73.628 158.662 73.3356C158.662 64.4588 158.677 55.582 158.644 46.7082C158.635 43.9863 158.265 41.3128 157.084 38.8049C155.797 36.0681 153.675 34.4283 150.644 34.0937C146.444 33.6296 142.777 34.6634 140.092 38.1267C138.463 40.2276 137.694 42.6902 137.345 45.2734C137.161 46.6358 137.094 48.0193 137.091 49.3968C137.067 57.3212 137.079 65.2425 137.079 73.1668V74.1796H123.281V22.3776C123.544 22.3655 123.789 22.3444 124.038 22.3444C127.82 22.3444 131.604 22.3565 135.386 22.3293C136.022 22.3233 136.246 22.477 136.301 23.1462C136.437 24.816 136.679 26.4769 136.903 28.3577C137.736 27.4927 138.396 26.6637 139.195 26.0036C141.851 23.8093 144.942 22.5433 148.325 21.9224C151.864 21.2744 155.383 21.2894 158.904 22.0912C163.528 23.1462 166.828 25.8921 169.123 29.9131C171.061 33.307 171.897 37.0507 172.263 40.8878C172.484 43.2027 172.539 45.5417 172.548 47.8717C172.578 56.3476 172.56 64.8205 172.56 73.2964V74.2338L172.563 74.2308Z'
                    fill='black'
                  />
                  <path
                    d='M357.371 35.7818V23.4115H365.126V9.50098H378.99V23.3723H394.826V35.7456H379.018V36.5564C379.018 42.5758 378.99 48.5951 379.039 54.6115C379.051 55.9528 379.223 57.3182 379.529 58.6264C380.147 61.2819 382.209 62.8493 384.946 63.0723C387.68 63.2954 390.148 62.6956 392.352 61.0588C392.471 60.9714 392.601 60.9051 392.794 60.7815C393.458 62.3941 394.106 63.9615 394.754 65.5319C395.459 67.244 396.14 68.9651 396.873 70.6651C397.097 71.1866 397.046 71.485 396.555 71.8316C393.579 73.9506 390.266 75.1743 386.657 75.6717C383.384 76.1208 380.123 76.172 376.886 75.4215C371.85 74.258 368.48 71.1956 366.621 66.4362C365.434 63.3918 365.162 60.2058 365.156 56.9806C365.144 50.259 365.153 43.5403 365.153 36.8187V35.7788H357.374L357.371 35.7818Z'
                    fill='black'
                  />
                  <path
                    d='M211.747 61.9176V74.1884C211.656 74.2155 211.566 74.2697 211.472 74.2697C207.59 74.2788 203.696 74.4174 199.854 73.7302C196.459 73.1213 193.262 72.0573 190.818 69.435C188.884 67.3552 187.83 64.8594 187.439 62.1075C187.173 60.2266 187.018 58.3186 187.003 56.4197C186.955 49.5262 186.985 42.6297 186.985 35.7332C186.985 35.4107 186.985 35.0852 186.985 34.6602H179.3V22.3683H186.967V8.48486H200.874V22.3441H211.166V34.63H200.941C200.923 34.9646 200.898 35.2057 200.898 35.4469C200.898 41.9153 200.877 48.3838 200.916 54.8553C200.923 55.9977 201.065 57.1642 201.337 58.2704C201.913 60.6154 203.242 61.6945 205.679 61.8392C207.387 61.9417 209.107 61.8965 210.821 61.9176C211.117 61.9206 211.414 61.9176 211.75 61.9176H211.747Z'
                    fill='black'
                  />
                  <path
                    d='M233.518 22.103V73.9231H219.683V22.103H233.518Z'
                    fill='black'
                  />
                  <path
                    d='M226.647 16.8645C221.609 16.8916 218.075 13.5609 217.963 8.84674C217.833 3.51764 221.769 -0.0180161 226.68 6.90565e-05C231.546 0.0181542 235.198 3.59299 235.222 8.40667C235.246 13.3741 231.737 16.8344 226.647 16.8645ZM223.441 8.40365C223.407 10.2303 224.694 11.5505 226.523 11.5595C228.391 11.5716 229.733 10.3327 229.775 8.56039C229.817 6.7579 228.443 5.34123 226.644 5.32917C224.839 5.31711 223.474 6.62829 223.441 8.40064V8.40365Z'
                    fill='black'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_4310_696'>
                    <rect width='397' height='76' fill='white' />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className='flex flex-col lg:grid lg:grid-cols-3 gap-10'>
            <div className='text-lg text-left lg:col-span-2'>
              <div className='flex items-center mb-5'>
                <div className='bg-orange flex items-center justify-center text-3xl md:text-7xl text-white font-bold font-mono w-10 md:w-20 h-10 md:h-20 p-3 mr-3 md:mr-10'>
                  3
                </div>
                <SectionHeader
                  header={intl.formatMessage({
                    id: 'page.year-in-review.2023.section.collaborations.3.heading',
                    defaultMessage: 'Advancing <b>ANIMAL ADVOCACY WITH AI</b>',
                  })}
                  smallOnMobile={true}
                  stackEntries
                />
              </div>
              <FormattedMessage
                id='page.year-in-review.2023.section.collaborations.3.content'
                defaultMessage='Together with <no-localization>Stray Dog Institute</no-localization>, we hosted two webinars on AI, covering ground on topics such as accelerating change through AI, its role in scaling, optimizing campaigns, and supplementing our advocacy as a whole. As capacity builders, we prioritize equipping advocates with the resources needed to boost their efficiency and impact. AI undoubtedly serves as a tool for this very purpose.'
                values={{
                  b: (chunks) => <b>{chunks}</b>,
                  break: <br />,
                }}
              />
            </div>
            <div className='bg-[#F1F1F1] p-10 flex items-center justify-center max-w-xl mx-auto w-full'>
              <CustomImage alt='Stray Dog Institute' src={SGILogo} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Collaborations;
