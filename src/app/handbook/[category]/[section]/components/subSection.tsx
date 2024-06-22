'use client';

import useDocsStore from 'lib/stores/docsStore';
import { Waypoint } from 'react-waypoint';
import { IDocumentationFields } from 'types/generated/contentful';

export const SubSectionWaypoint: React.FC<
  Pick<IDocumentationFields, 'slug'>
> = ({ slug }) => {
  const setCurrentDocSlug = useDocsStore((state) => state.setCurrentDocSlug);

  return (
    <>
      <Waypoint
        onEnter={() => {
          setCurrentDocSlug(slug);
        }}
      />
    </>
  );
};
