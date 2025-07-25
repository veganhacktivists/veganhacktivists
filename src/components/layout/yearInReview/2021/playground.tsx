import { FormattedMessage, useIntl } from 'react-intl';

import { SectionHeader } from '../../../decoration/textBlocks';
import SectionContainer from '../sectionContainer';
import { DarkButton } from '../../../decoration/buttons';
import SquareField from '../../../decoration/squares';
import discord from '../../../../../public/images/yearInReview/2021/discord.png';

import CustomImage from 'components/decoration/customImage';

const Playground: React.FC = () => {
  const intl = useIntl();
  return (
    <>
      <SquareField
        className="hidden md:block"
        squares={[
          { color: 'grey-background', left: 0, bottom: 0 },
          { color: 'grey-background', right: 0, bottom: 0 },
          { color: 'grey-light', right: 0, top: 0 },
        ]}
      />
      <SectionContainer color="grey-background" className="text-grey md:pb-40">
        <div className="flex flex-col md:flex-row md:w-2/3 mx-auto gap-x-10">
          <div className="md:text-left md:w-3/4">
            <SectionHeader
              className="mt-5 mb-10"
              header={intl.formatMessage({
                id: 'page.year-in-review.2021.section.playground.headline',
                defaultMessage: '<b>VH: Playground</b> launched',
              })}
            />
            <div className="space-y-5">
              <FormattedMessage
                id="page.year-in-review.2021.section.playground.paragraph"
                defaultMessage="<p>We launched an open-source community available to the public called <no-localization>VH: Playground</no-localization>! <no-localization>Playground</no-localization> allows developers who don't have the time or specific skills to join the core <no-localization>Vegan Hacktivists</no-localization> team to still contribute to the movement, whether that be on our open source projects or their own!</p> <p>In short, we wanted to build and foster a community of vegan developers in order to support folks outside of our network—so far we've attracted over 400 members, and counting!</p>"
                values={{
                  p: (chunks) => <p>{chunks}</p>,
                }}
              />
              <div className="mt-5 pt-5 w-min mx-auto md:mx-0">
                <DarkButton
                  href="https://discord.gg/cRqJBmUR9b"
                  className="w-min font-semibold"
                >
                  <FormattedMessage
                    id="page.year-in-review.2021.section.playground.btn.cta"
                    defaultMessage="Join the playground"
                  />
                </DarkButton>
              </div>
            </div>
          </div>
          <div className="w-1/3 mx-auto mt-10 md:mt-0 md:mx-0 flex-grow md:my-auto translate-y-2/2">
            <CustomImage src={discord} alt="" />
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default Playground;
