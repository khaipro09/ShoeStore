import React from "react";
import * as Style from "./style";
import moment from "moment";
import "moment/locale/vi";
import history from "../../../../../utils/history";
function ArticlesHome({ articlesList }) {
  function renderArticlesList() {
    return articlesList?.map((article, index) => {
      return (
        <Style.ArticleItem
          key={`${article.id}-${index}`}
          onClick={() => history.push(`/blog/${article.id}`)}
        >
          <div className="article-img">
            <img src={article.thumb} alt="" />
          </div>
          <div className="article-content">
            {/* Đổi từ moment(article.createdAt).fromNow() sang định dạng ngày hiện tại */}
            <span>{moment(article.createdAt).format("DD/MM/YYYY HH:mm")}</span>
            <h2>
              <title>{article.title}</title>
            </h2>
            <p>{article.desc}</p>
          </div>
        </Style.ArticleItem>
      );
    });
  }  
  return <Style.ArticleList>{renderArticlesList()}</Style.ArticleList>;
}

export default ArticlesHome;
