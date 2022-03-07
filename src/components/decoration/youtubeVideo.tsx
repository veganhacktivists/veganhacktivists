import type { HTMLAttributes } from 'react';

interface YoutubeVideoProps extends HTMLAttributes<HTMLIFrameElement> {
  id: string;
}

const YoutubeVideo: React.FC<YoutubeVideoProps> = ({ id, ...props }) => {
  return (
    <iframe
      className="w-full aspect-video"
      src={`https://www.youtube.com/embed/${id}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      {...props}
    />
  );
};

export default YoutubeVideo;
