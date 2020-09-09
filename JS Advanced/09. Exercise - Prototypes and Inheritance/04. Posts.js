posts = () => {
    class Post {
        constructor(title, content) {
            [this.title, this.content] = [title, content];
        }

        toString() {
            return `Post: ${this.title}\nContent: ${this.content}`;
        }
    }

    class SocialMediaPost extends Post {
        constructor(title, content, likes, dislikes) {
            super(title, content);
            [this.likes, this.dislikes, this.comments] = [likes, dislikes, []];
        }

        addComment(comment) {
            this.comments.push(comment);
        }

        toString = () => {
            const comments = this.comments.length
                ? `\nComments:\n${this.comments.map((c) => ` * ${c}`).join('\n')}`
                : '';
            return `${super.toString()}\nRating: ${this.likes - this.dislikes}${comments}`;
        };
    }

    class BlogPost extends Post {
        constructor(title, content, views) {
            super(title, content);
            this.views = views;
        }

        view = () => {
            this.views++;
            return this;
        };

        toString = () => `${super.toString()}\nViews: ${this.views}`;
    }

    return { Post, SocialMediaPost, BlogPost };
};
