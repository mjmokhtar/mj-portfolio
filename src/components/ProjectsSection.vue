<script setup>
import { projects } from '../data/projects.js'
</script>

<template>
  <section class="bg-primary">
    <div class="px-8 max-w-7xl mx-auto py-6">

      <div class="space-y-2">
        <div class="h-0.5 bg-secondary"
          data-aos="fade-up"
          data-aos-duration="1000">
        </div>
        <h3 class="text-secondary text-base font-medium"
          data-aos="fade-up"
          data-aos-duration="1500">
          <span>Main</span> <span class="font-bold">projects</span>
        </h3>
      </div>

      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 list-none">
        <li
          v-for="(project, index) in projects"
          :key="project.num"
          class="flow-root"
          data-aos="fade-up"
          :data-aos-duration="1500 + index * 500">

          <!-- external link -->
          <a v-if="project.external"
            :href="project.url"
            target="_blank"
            class="group block">
            <p class="num-text">{{ project.num }}</p>
            <p class="italic text-secondary shrink-0 group-hover:opacity-60 transition-opacity duration-200 text-base mt-2">{{ project.title }}</p>
            <p class="text-xl mt-3 indent-9 leading-relaxed text-secondary">{{ project.description }}</p>
            <p class="text-xs mt-3 opacity-50 text-secondary">{{ project.stack }}</p>
          </a>

          <!-- internal link -->
          <RouterLink v-else
            :to="project.url"
            class="group block">
            <p class="num-text">{{ project.num }}</p>
            <p class="italic text-secondary shrink-0 group-hover:opacity-60 transition-opacity duration-200 text-base mt-2">{{ project.title }}</p>
            <p class="text-xl mt-3 indent-9 leading-relaxed text-secondary">{{ project.description }}</p>
            <p class="text-xs mt-3 opacity-50 text-secondary">{{ project.stack }}</p>
          </RouterLink>

        </li>
      </ul>

    </div>
  </section>
</template>

<style scoped>
.num-text {
  font-family: 'Geist', sans-serif;
  font-size: 8rem;
  font-weight: 900;
  font-style: italic;
  line-height: 1;
  color: #161614;
  margin-bottom: 0.5rem;
}

@media (min-width: 1024px) {
  .num-text {
    writing-mode: vertical-rl;
    text-orientation: mixed;
    transform: rotate(270deg);
    height: auto;
    width: fit-content;
    margin-bottom: 0.5rem;
    margin-left: 2rem;
    font-size: 7rem;
  }
}
</style>