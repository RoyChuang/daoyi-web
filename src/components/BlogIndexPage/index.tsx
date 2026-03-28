import ArticleCardCompact from "../../components/ArticleCards/ArticleCardCompact";
import { SORTED_ARTICLES_BY_DATE } from "../../../BLOG_CONSTANTS/_ARTICLES_LIST";
import { useRouter } from "next/router";
import { PageLayout } from "../../components";
import { combineClasses } from "../../utils/utils";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { iArticle } from "../../shared/interfaces";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";

const BlogIndexPage = ({ articlesPerPage = 12 }: { articlesPerPage?: number }) => {
  const router = useRouter();
  const { category, author } = router.query;
  const categoryArticles = SORTED_ARTICLES_BY_DATE.filter(
    (each) => each.preview.category === category
  );
  const authorArticles = SORTED_ARTICLES_BY_DATE.filter(
    (each) => each.preview.author.name === author
  );

  const [ARTICLES, setARTICLES] = useState(SORTED_ARTICLES_BY_DATE);

  useEffect(() => {
    setARTICLES(
      category
        ? categoryArticles
        : author
        ? authorArticles
        : SORTED_ARTICLES_BY_DATE
    );
  }, [category, author]);

  const [currentItems, setCurrentItems] = useState(ARTICLES);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + articlesPerPage;
    setCurrentItems(ARTICLES.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(ARTICLES.length / articlesPerPage));
  }, [itemOffset, articlesPerPage, ARTICLES]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * articlesPerPage) % ARTICLES.length;
    setItemOffset(newOffset);
  };

  return (
    <PageLayout home>
      <div
        className={combineClasses(
          "container px-0 md:px-3 pt-6"
        )}
      >
        {/* {category || author ? (
          <h1
            className="px-2 mb-[30px] text-[45px] font-bold"
            style={{ textTransform: "capitalize" }}
          >
            {category || author}
            <hr className="mt-[10px]" />
          </h1>
        ) : null} */}
        <h1 className='px-3 w-full mb-5 text-3xl font-bold text-[#334155] flex items-center gap-3'>
          <FontAwesomeIcon icon={faBullhorn} className="text-[#334155]" />
          班會報導
        </h1>
        <div className="flex flex-wrap">
          {currentItems
            ? (currentItems as any).map((each: iArticle, i: any) => (
                <ArticleCardCompact article={each.preview} path={each.path} key={i} />
              ))
            : null}
        </div>

        <ReactPaginate
          breakLabel="..."
          nextLabel={<AiFillCaretRight />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={pageCount}
          previousLabel={<AiFillCaretLeft />}
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </PageLayout>
  );
};

export default BlogIndexPage;
