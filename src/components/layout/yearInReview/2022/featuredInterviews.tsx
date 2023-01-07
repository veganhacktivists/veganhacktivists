import React from 'react';

import SectionContainer from '../sectionContainer';
import { SectionHeader } from '../../../decoration/textBlocks';

import SubtleBorder from 'components/decoration/subtleBorder';
import BlogEntrySummary from 'components/layout/blog/blogEntrySummary';
import { trpc } from 'lib/client/trpc';
import { DarkButton } from 'components/decoration/buttons';

interface FeaturedInterviewsProps {
  interviews: string[];
}

const FeaturedInterviews: React.FC<FeaturedInterviewsProps> = ({
  interviews,
}) => {
  const { data: blogs } = trpc.blog.getBlogsBySlugs.useQuery(interviews, {
    keepPreviousData: true,
  });
  return (
    <>
      <SectionContainer
        header={
          <SectionHeader header={['Featured', 'interviews']} newDesign={true} />
        }
      >
        <div className="text-xl md:w-2/3 mx-auto pb-32">
          Earlier in the year, we had the honor of sitting down with diverse
          leaders in animal protection. We were inspired by their origin
          stories, words of wisdom, and their openness and candor in sharing
          their experiences with us — and hope you are too.
        </div>
        <div className="grid md:grid-cols-3 md:gap-x-12 gap-y-10 xl:w-2/3 mx-auto auto-rows-min pb-20">
          {blogs &&
            blogs.map((blog) => {
              return (
                <SubtleBorder
                  key={blog.fields.slug}
                  className="col-span-full md:col-span-1"
                >
                  <BlogEntrySummary blog={blog} />
                </SubtleBorder>
              );
            })}
        </div>
        <div className="flex justify-center pb-20">
          <DarkButton className="mb-0" href={'/blog'}>
            Read More on the Blog
          </DarkButton>
        </div>
      </SectionContainer>
    </>
  );
};

export default FeaturedInterviews;
