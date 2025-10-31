---
title: "📚 Blog do Kastner"
---

<script setup>
// Carrega metadados das páginas Markdown (inclui frontmatter)
const modules = import.meta.glob('./posts/**/*.md', {
  eager: true,
  import: '__pageData'
})

const posts = Object.entries(modules)
  .map(([p, page]) => ({
    url: p.replace('./', '/').replace(/\.md$/, ''),
    frontmatter: (page && page.frontmatter) || {}
  }))
  .filter((p) => p.frontmatter.title && p.frontmatter.date)
  .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
</script>   

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.2rem;
  background: var(--vp-c-bg-soft);
  transition: all 0.2s ease;
  text-decoration: none;
  display: block;
}

.card:hover {
  transform: translateY(-4px);
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-alt);
}

.title {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.3rem;
}

.date {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.8rem;
}

.excerpt {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.8rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tag {
  background: var(--vp-c-brand-1);
  color: white;
  border-radius: 6px;
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
}
</style>

# 📝 Últimos Posts

<div class="grid">
  <a v-for="post in posts" :key="post.url" class="card" :href="post.url">
    <div class="title">{{ post.frontmatter.title }}</div>
    <div class="date">{{ new Date(post.frontmatter.date).toLocaleDateString('pt-BR') }}</div>
    <div class="excerpt">{{ post.frontmatter.description || 'Sem descrição.' }}</div>
    <div class="tags" v-if="post.frontmatter.tags">
      <span v-for="tag in post.frontmatter.tags" class="tag">{{ tag }}</span>
    </div>
  </a>
</div>
