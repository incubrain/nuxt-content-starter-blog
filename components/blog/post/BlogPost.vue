<template>
  <div v-if="post.title">
    <main>
      <BlogPostHero :post="post" />
      <div
        class="w-full grid grid-cols-[1fr] xl:grid-cols-[minmax(250px,1fr)_740px_minmax(250px,1fr)] xl:gap-8 pt-8 padded-x"
      >
        <div class="hidden xl:block xl:sticky top-24 left-0 h-[300px] xl:col-start-1">
          <BlogPostToc
            :toc="post.body.toc.links"
            :updated-at="post.updatedAt"
            :version="post.version"
          />
        </div>
        <div
          class="flex flex-col h-full justify-start max-w-[700px] gap-8 mx-auto w-full xl:hidden pb-6"
        >
          <BlogPostToc
            class="visible xl:hidden background py-6 px-4 rounded-md border border-color"
            :toc="post.body.toc.links"
            :updated-at="post.updatedAt"
            :version="post.version"
            expanded
          />
        </div>
        <div class="mx-auto flex flex-col justify-center items-center w-full xl:col-start-2">
          <ContentRenderer
            :value="post"
            class="w-full"
          >
            <div class="container">
              <div class="mx-auto space-y-8 max-w-[700px]">
                <ContentRendererMarkdown
                  :value="post.body"
                  class="nuxt-content"
                >
                  {{ post.body }}
                </ContentRendererMarkdown>
                <BlogPostShare
                  :link="post._id.replaceAll(':', '/')"
                  :summary="post.description"
                />
              </div>
            </div>
          </ContentRenderer>
        </div>
      </div>
    </main>
    <aside class="space-y-12 padded-x pb-12 pt-10 max-w-3xl mx-auto">
      <BlogPostAuthorCard :author-id="post.authors[0]" />
    </aside>
  </div>
</template>

<script setup lang="ts">
import type { PostFullT } from '~/types/posts'

defineProps({
  post: {
    type: Object as PropType<PostFullT>,
    required: true
  }
})
</script>

<style></style>
