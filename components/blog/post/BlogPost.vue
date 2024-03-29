<template>
  <div
    v-if="post.body"
    class="max-w-full"
  >
    <main>
      <BlogPostHero :post="post" />
      <div
        class="grid grid-cols-[minmax(300px,700px)] xl:grid-cols-[minmax(240px,1fr)_minmax(660px,740px)_minmax(240px,1fr)] xl:gap-8 pt-8 padded-x justify-center"
      >
        <div class="w-full xl:col-start-1 pb-12">
          <BlogPostToc
            class="background p-4 xl:p-0 rounded-md border border-color xl:border-none xl:sticky xl:top-24 xl:left-0"
            :toc="post.body.toc.links"
            :updated-at="post.updatedAt"
            :version="post.version"
            :expanded="width < 1024"
          />
        </div>
        <div class="xl:col-start-2 xl:padded-x">
          <ContentRenderer :value="post">
            <div class="pb-12">
              <div
                class="mx-auto space-y-8"
                ref="postContent"
              >
                <ContentRendererMarkdown
                  :value="post.body"
                  class="nuxt-content"
                >
                  {{ post.body }}
                </ContentRendererMarkdown>
              </div>
              <BlogPostShare
                :link="post._id.replaceAll(':', '/')"
                :summary="post.description"
              />
              <BlogPostAuthorCard />
            </div>
          </ContentRenderer>
        </div>
        <div class="mx-auto w-full py-4 lg:p-4">
          <BlogPostSEO
            :post="post"
            :post-html="postHtml"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { PostFullT } from '~/types/posts'

const { width } = useWindowSize()

const postContent = ref<HTMLElement | null>(null)
const postHtml = ref<string>('')

watch(
  () => postContent.value,
  async (newVal) => {
    if (newVal && p.post.body) {
      // awiat timeout of 1 seconds
      await new Promise((resolve) => setTimeout(resolve, 1000))
      postHtml.value = newVal.innerHTML
    }
  }
)

const p = defineProps({
  post: {
    type: Object as PropType<PostFullT>,
    required: true
  }
})
</script>

<style>
.nuxt-content p {
  font-size: 18px;
  margin-bottom: 22px;
  line-height: 1.65;
  font-family: 'Open Sans', sans-serif;
}

.nuxt-content h2,
.nuxt-content h3,
.nuxt-content h4,
.nuxt-content h5,
.nuxt-content h6 {
  text-decoration: none;
  margin-bottom: 18px;
  font-family: 'Oswald', 'sans-serif';
  font-weight: 700;
}

/* Golden Ratio for heading sizes */
.nuxt-content h2 {
  margin-top: 24px;
  font-size: 36px;
  line-height: 1.6;
}

.nuxt-content h3 {
  margin-top: 2.8rem;
  font-size: 28px;
  line-height: 1.6;
}

.nuxt-content h4 {
  font-size: 22px;
  line-height: 1.3;
}

.nuxt-content ul,
ol {
  margin-bottom: 28px;
  font-family: 'Open Sans', sans-serif;
}

.nuxt-content ul {
  list-style: disc;
}

.nuxt-content ol {
  list-style: decimal;
}

.nuxt-content li {
  margin-left: 1.6rem;
  font-size: 18px;
  margin-bottom: 22px;
  line-height: 1.55;
}

.nuxt-content p a {
  color: #10b981;
  text-decoration: none;
  font-weight: 500;
}

@media (max-width: 768px) {
  .nuxt-content p {
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 16px;
    font-family: 'Open Sans', sans-serif;
  }

  .nuxt-content li {
    font-size: 16px;
  }

  .nuxt-content h2 {
    margin-top: 10px;
    font-size: 30px;
    line-height: 1.6;
  }

  .nuxt-content h3 {
    margin-top: 2.8rem;
    font-size: 26px;
    line-height: 1.6;
  }

  .nuxt-content h4 {
    font-size: 22px;
    line-height: 1.3;
  }

  .nuxt-content li {
    margin-left: 1.6rem;
    font-size: 16px;
    margin-bottom: 22px;
    line-height: 1.55;
  }
}
</style>
