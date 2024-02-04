<template>
  <div class="space-y-10 wrapper padded-y padded-x">
    <h1>Blog Home</h1>
    <BlogShowcase
      post-category="frontend"
      :title="{
        main: 'Latest Frontend Posts',
        label: 'Frontend',
        subtitle: 'The latest posts about frontend development'
      }"
    >
      <UButton to="/blog/frontend">All Frontend Posts</UButton>
    </BlogShowcase>
    <BlogShowcase
      post-category="backend"
      :title="{
        main: 'Latest Backend Posts',
        label: 'backend',
        subtitle: 'The latest posts about backend development'
      }"
    >
      <UButton to="/blog/backend">All Backend Posts</UButton>
    </BlogShowcase>
    <BlogShowcase
      post-category="projects"
      :title="{
        main: 'Latest Projects Posts',
        label: 'projects',
        subtitle: 'The latest posts about projects development'
      }"
    >
      <UButton to="/blog/projects">All Project Posts</UButton>
    </BlogShowcase>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
