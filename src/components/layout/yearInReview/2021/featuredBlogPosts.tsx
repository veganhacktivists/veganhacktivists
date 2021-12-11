import Link from 'next/link';
import type {
  IBlogEntry,
  ITeamMember,
} from '../../../../types/generated/contentful';
import { SectionHeader } from '../../../decoration/textBlocks';
import ContentfulImage from '../../contentfulImage';

export interface FeaturedBlogPostsProps {
  featuredBlogPosts: {
    member: ITeamMember;
    blogEntry: IBlogEntry;
  }[];
}

const FeaturedBlogPosts: React.FC<FeaturedBlogPostsProps> = ({
  featuredBlogPosts,
}) => {
  return (
    <div>
      <SectionHeader
        className="text-grey"
        header={['Featured', 'blog posts']}
        startWithItalics
      >
        We&apos;ve been having fun with our Blog! We launched our &ldquo;Meet
        The Team&rdquo; series so that we could both feature them for the
        incredible work that they do with us, and so that others from our
        community could get to know each other better. We plan on doing many
        more of this!
      </SectionHeader>

      <div className="flex flex-col md:flex-row gap-5 justify-center w-min mx-auto">
        {featuredBlogPosts.map(({ member, blogEntry }) => {
          const { name, team, image } = member.fields;
          const color = team?.fields.color;

          if (!color || !image) {
            return null;
          }

          return (
            <Link
              href={{
                pathname: '/blog/[slug]',
                query: { slug: blogEntry.fields.slug },
              }}
              key={blogEntry.fields.slug}
            >
              <a>
                <div className="w-64">
                  <div className="bg-grey w-100 h-64 flex justify-end mb group">
                    {image && (
                      <div className="relative">
                        <ContentfulImage image={image} alt={name} />
                        <div
                          className={
                            'left-0 top-0 w-full h-full absolute opacity-10'
                          }
                          style={{
                            backgroundColor: color,
                          }}
                        />
                      </div>
                    )}
                    <div
                      style={{ backgroundColor: color }}
                      className={'absolute w-8 h-8'}
                    />
                  </div>
                  <div
                    style={{ backgroundColor: color }}
                    className="font-bold p-5"
                  >
                    Meet {/* Sorry Suan Chin! */}
                    {name.includes('Suan')
                      ? name.split(' ').slice(0, 2).join(' ')
                      : name.split(' ')[0]}
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedBlogPosts;
