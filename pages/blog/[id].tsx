/**These are necessary imports / components for the page */
import _ from 'lodash';
import fs from "fs";
import path from "path";

import { ImageSize } from "../../src/shared/enums";
import { PageLayout, Text, Image, } from "../../src/components";
import { getArticleDetailById } from '../../src/utils/utils';
import { ARTICLES_LIST } from '../../BLOG_CONSTANTS/_ARTICLES_LIST';

function Activities(props: { detail: any; images: any }) {
  const details = JSON.parse(props.detail);
  const images = props.images;

  return (
    <PageLayout blogcentered>
      <Text p>
          {details.shortIntro}
      </Text>
      <div className="flex flex-wrap">
        {_.map(images, (image: any, index: number) => {
          return (
            <Image className="mt-3 ml-0 rounded-lg overflow-hidden shadow" src={image} alt="nextjs-simple-blog-template" size={ImageSize.MEDIUM} key={index} />
          )
        })}
      </div>

    </PageLayout>
  );
}

export default Activities;

// 靜態路徑生成
export async function getStaticPaths() {
  // 從文章列表取得所有 ID
  const paths = ARTICLES_LIST.map((article) => ({
    params: { id: article.id || article.path?.split('/').pop() || '' },
  }));

  return {
    paths,
    fallback: false, // 不在列表中的路徑返回 404
  };
}

// 靜態頁面生成
export async function getStaticProps(context: { params: { id: string } }) {
  const { id } = context.params;
  const ARTICLE_DETAILS = getArticleDetailById(id);   
  let detail = JSON.stringify(ARTICLE_DETAILS?.preview || {});

  let images: string[] = [];
  try {
    const imagesDirectory = path.join(process.cwd(), `public/images/blog/${id}`);
    const filenames = fs.readdirSync(imagesDirectory);
    images = filenames.map(name => path.join(`/images/blog/${id}`, name));
  } catch (error) {
    // 如果圖片目錄不存在，使用空陣列
    images = [];
  }

  return {
    props: {
      detail,
      images,
    },
  };
}
