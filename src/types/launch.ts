export interface Launch {
   flight_number: number;
   mission_name: string;
   mission_id: string[];
   launch_year: string;
   launch_date_unix: number;
   launch_date_utc: string;
   launch_date_local: string;
   rocket: {
      rocket_id: string;
      rocket_name: string;
      rocket_type: string;
   };
   links: {
      mission_patch: string;
      mission_patch_small: string;
      reddit_campaign: string | null;
      reddit_launch: string | null;
      reddit_recovery: string | null;
      reddit_media: string | null;
      presskit: string | null;
      article_link: string | null;
      wikipedia: string | null;
      video_link: string | null;
      youtube_id: string | null;
      flickr_images: string[];
   };
   details: string | null;
}