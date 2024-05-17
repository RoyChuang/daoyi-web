/**These are necessary imports / components for the page */
import _ from 'lodash';

import { ImageSize } from "../../src/shared/enums";
import { PageLayout, Text, Image, } from "../../src/components";
import { getArticleDetailById } from '../../src/utils/utils';

function Activities(props: { detail: any; }) {
  const details = JSON.parse(props.detail);

  return (
    <PageLayout blogcentered>
      <Text p>
          {details.shortIntro}
      </Text>
      <div className="flex flex-wrap">
        {_.map(details.images, (image: any, index: number) => {
          return (
            <Image className="mt-3 ml-0 rounded-lg overflow-hidden shadow" src={image} alt="nextjs-simple-blog-template" size={ImageSize.MEDIUM} />
          )
        })}
      </div>

    </PageLayout>
  );
}

export default Activities;

export async function getServerSideProps(context: { query: { id: any; }; }) {
  const { id } = context.query;
  const ARTICLE_DETAILS = getArticleDetailById(id);   
  let detail = JSON.stringify(ARTICLE_DETAILS.preview);

  return {
    props: {
      detail,
    },
  };
}
