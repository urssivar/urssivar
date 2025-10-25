<script setup lang="ts">
import PostCard from "@/components/PostCard.vue";
import { data as posts } from './posts.data';
</script>

# Updates

[Telegram](https://t.me/urssivar) · [YouTube](https://youtube.com/@urssivar) · [GitHub](https://github.com/urssivar)

News and progress from the Urssivar campaign documenting Kaitag language, history, and people.

<PostCard v-for="p in posts" :key="p.url" :page="p"/>
