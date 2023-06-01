import { Autoscroll } from 'components/decoration/autoscroll';
import { DarkButton } from 'components/decoration/buttons';
import CustomImage from 'components/decoration/customImage';
import Sprite, { goat } from 'components/decoration/sprite';
import SquareField from 'components/decoration/squares';
import { SectionHeader } from 'components/decoration/textBlocks';

import aaa from '~images/work/orgs/aaa.png';
import aaasia from '~images/work/orgs/aaasia.png';
import aac from '~images/work/orgs/aac.png';
import activeforanimals from '~images/work/orgs/activeforanimals.png';
import adp from '~images/work/orgs/adp.png';
import ae from '~images/work/orgs/ae.png';
import aequality from '~images/work/orgs/aequality.png';
import afa from '~images/work/orgs/afa.png';
import ajp from '~images/work/orgs/ajp.png';
import an from '~images/work/orgs/an.png';
import animallaw from '~images/work/orgs/animallaw.png';
import apex from '~images/work/orgs/apex.png';
import are from '~images/work/orgs/are.png';
import asap from '~images/work/orgs/asap.png';
import asm from '~images/work/orgs/asm.png';
import att from '~images/work/orgs/att.png';
import awl from '~images/work/orgs/awl.png';
import ayllu from '~images/work/orgs/ayllu.png';
import beyond from '~images/work/orgs/beyond.png';
import bfs from '~images/work/orgs/bfs.png';
import bg from '~images/work/orgs/bg.png';
import bhakti from '~images/work/orgs/bhakti.png';
import bvs from '~images/work/orgs/bvs.png';
import clariteam from '~images/work/orgs/clariteam.png';
import db from '~images/work/orgs/db.png';
import don from '~images/work/orgs/don.png';
import dxe from '~images/work/orgs/dxe.png';
import east from '~images/work/orgs/east.png';
import elwoods from '~images/work/orgs/elwoods.png';
import faunalytics from '~images/work/orgs/faunalytics.png';
import fnpd from '~images/work/orgs/fnpd.png';
import fp from '~images/work/orgs/fp.png';
import fta from '~images/work/orgs/fta.png';
import gfi from '~images/work/orgs/gfi.png';
import gi from '~images/work/orgs/gi.png';
import greenbaum from '~images/work/orgs/greenbaum.png';
import hafrica from '~images/work/orgs/hafrica.png';
import harvest from '~images/work/orgs/harvest.png';
import ivff from '~images/work/orgs/ivff.png';
import lead from '~images/work/orgs/lead.png';
import lv from '~images/work/orgs/lv.png';
import mevs from '~images/work/orgs/mevs.png';
import mfa from '~images/work/orgs/mfa.png';
import nsg from '~images/work/orgs/nsg.png';
import octopus from '~images/work/orgs/octopus.png';
import owa from '~images/work/orgs/owa.png';
import pan from '~images/work/orgs/pan.png';
import pax from '~images/work/orgs/pax.png';
import pbd from '~images/work/orgs/pbd.png';
import peta from '~images/work/orgs/peta.png';
import phauna from '~images/work/orgs/phauna.png';
import ragriculture from '~images/work/orgs/ragriculture.png';
import rap from '~images/work/orgs/rap.png';
import rp from '~images/work/orgs/rp.png';
import sa from '~images/work/orgs/sa.png';
import sehati from '~images/work/orgs/sehati.png';
import sharpen from '~images/work/orgs/sharpen.png';
import sm from '~images/work/orgs/sm.png';
import surge from '~images/work/orgs/surge.png';
import tbf from '~images/work/orgs/tbf.png';
import tc from '~images/work/orgs/tc.png';
import tli from '~images/work/orgs/tli.png';
import tvns from '~images/work/orgs/tvns.png';
import vcj from '~images/work/orgs/vcj.png';
import vegfund from '~images/work/orgs/vegfund.png';
import vh from '~images/work/orgs/vh.png';
import vjl from '~images/work/orgs/vjl.png';
import vo from '~images/work/orgs/vo.png';
import wai from '~images/work/orgs/wai.png';
import wam from '~images/work/orgs/wam.png';
import wfs from '~images/work/orgs/wfs.png';

const images = [
  aaa,
  aaasia,
  aac,
  activeforanimals,
  adp,
  ae,
  aequality,
  afa,
  ajp,
  an,
  animallaw,
  apex,
  are,
  asap,
  asm,
  att,
  awl,
  ayllu,
  beyond,
  bfs,
  bg,
  bhakti,
  bvs,
  clariteam,
  db,
  don,
  dxe,
  east,
  elwoods,
  faunalytics,
  fnpd,
  fp,
  fta,
  gfi,
  gi,
  greenbaum,
  hafrica,
  harvest,
  ivff,
  lead,
  lv,
  mevs,
  mfa,
  nsg,
  octopus,
  owa,
  pan,
  pax,
  pbd,
  peta,
  phauna,
  ragriculture,
  rap,
  rp,
  sa,
  sehati,
  sharpen,
  sm,
  surge,
  tbf,
  tc,
  tli,
  tvns,
  vcj,
  vegfund,
  vh,
  vjl,
  vo,
  wai,
  wam,
  wfs,
];

const numberOfRows = 3;

const imageRows = [...new Array(numberOfRows)].map((_, i) => {
  const itemsPerRow = Math.ceil(images.length / numberOfRows);
  return images
    .slice(i * itemsPerRow, (i + 1) * itemsPerRow)
    .map((image) => (
      <CustomImage priority key={image.src} src={image} alt="" />
    ));
});

const TOP_DECORATION_SQUARES = [
  { color: 'yellow', size: 16, left: 0, top: 0 },
  {
    color: 'red',
    size: 32,
    right: 0,
    top: 0,
    className: 'scale-y-50 -translate-y-8',
  },
];

const BOTTOM_DECORATION_SQUARES = [
  { color: 'gray-background', size: 16, left: 0, bottom: 0 },
];

const OurWork: React.FC = () => {
  return (
    <>
      <SquareField
        squares={TOP_DECORATION_SQUARES}
        className="hidden md:block"
      />

      <div className="w-full bg-white">
        <div className="flex flex-col py-20">
          <div className="md:w-1/2 mx-auto -mb-10 px-5">
            <SectionHeader className="mb-2" header={['Our', 'WORK']}>
              We’ve worked with over <b>200+ organizations</b> in the animal
              protection movement, through our development, design and advisory
              services.
            </SectionHeader>
          </div>
          <Autoscroll items={imageRows} />
          <div className="mt-24 mx-auto flex flex-col md:flex-row gap-9 w-full md:w-fit px-5">
            <DarkButton href="/services" className="font-mono md:w-fit">
              Explore our services
            </DarkButton>
            <DarkButton href="/join" className="font-mono md:w-fit">
              Volunteer with us
            </DarkButton>
            <DarkButton href="/support" className="font-mono md:w-fit">
              Support our work
            </DarkButton>
          </div>
        </div>
      </div>

      <Sprite image={goat} pixelsLeft={1} pixelsRight={0} />

      <SquareField
        squares={BOTTOM_DECORATION_SQUARES}
        className="hidden md:block"
      />
    </>
  );
};

export default OurWork;
