/**These are necessary imports / components for the page */
import { ImageSize, TextAlign, ListType } from "../../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider } from "../../src/components";
import CodeBlock from "../../src/components/CodeBlock";
import { HowToUseImageCode, HowToUseList, HowToUseSeperator, HowToUseTextCode } from "../../src/constants/codeBlocks";

function Activities(props: { material: any; lang: any; }) {
  const { material, lang } = props;

  return (
    <PageLayout blogcentered>
      <Text p>
          111
      </Text>
      <div className="flex flex-wrap">
        <Image className="mt-3 ml-0 rounded-lg overflow-hidden shadow" src="/public/images/blog/1/1.jpeg" alt="nextjs-simple-blog-template" size={ImageSize.MEDIUM} />
      </div>

    </PageLayout>
  );
}

export default Activities;

export async function getServerSideProps(context: { query: { id: any; }; }) {
  const { id } = context.query;
  console.log("🚀 ~ getServerSideProps ~ id:==", id)
  // const res = await getMaterialById(path[0]);
  let material = null;
  // let lang = path[1];
  // if (res && res.data) {
  //   material = res.data;
  // }

  return {
    props: {
      material,
    },
  };
}
