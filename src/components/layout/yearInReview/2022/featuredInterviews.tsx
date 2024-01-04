import React from 'react';
import { FormattedMessage } from 'react-intl';

import SectionContainer from '../sectionContainer';
import { SectionHeader } from '../../../decoration/textBlocks';

import SubtleBorder from 'components/decoration/subtleBorder';
import BlogEntrySummary from 'components/layout/blog/blogEntrySummary';
import { trpc } from 'lib/client/trpc';
import { DarkButton } from 'components/decoration/buttons';
import Spinner from 'components/decoration/spinner';

interface FeaturedInterviewsProps {
  interviews: string[];
}

const FeaturedInterviews: React.FC<FeaturedInterviewsProps> = ({
  interviews,
}) => {
  const {
    data: blogs,
    isLoading,
    isError,
  } = trpc.blog.getBlogsBySlugs.useQuery(interviews, {
    keepPreviousData: true,
  });
  return (
    <>
      <SectionContainer
        header={
          <SectionHeader header={['Featured', 'interviews']} newDesign={true} />
        }
      >
        <div className='text-xl md:w-2/3 mx-auto pb-16'>
          <FormattedMessage
            id='page.year-in-review.2022.section.featured-interviews.paragraph'
            defaultMessage='Earlier in the year, we had the honor of sitting down with diverse leaders in animal protection. We were inspired by their origin stories, words of wisdom, and their openness and candor in sharing their experiences with us — and hope you are too.'
          />
        </div>
        {isLoading && !isError && (
          <div>
            <span className='block mb-1'>
              <FormattedMessage
                id='page.year-in-review.2022.section.featured-interviews.loading-spinner'
                defaultMessage='Loading'
              />
            </span>
            <Spinner />
          </div>
        )}
        <div className='grid md:grid-cols-3 md:gap-x-12 gap-y-10 xl:w-2/3 mx-auto auto-rows-min pb-20'>
          {!isLoading &&
            !isError &&
            blogs &&
            blogs.map((blog) => {
              return (
                <SubtleBorder
                  key={blog.fields.slug}
                  className='col-span-full md:col-span-1'
                >
                  <BlogEntrySummary blog={blog} />
                </SubtleBorder>
              );
            })}
        </div>
        <div className='flex justify-center pb-20'>
          <DarkButton className='mb-0' href={'/blog'}>
            <FormattedMessage
              id='page.year-in-review.2022.section.featured-interviews.btn.cta'
              defaultMessage='Read More on the Blog'
            />
          </DarkButton>
        </div>
      </SectionContainer>
    </>
  );
};

export default FeaturedInterviews;
