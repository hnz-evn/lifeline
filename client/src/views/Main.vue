<template>
  <div class="container">
    <div v-for="game in games" :key="game.id" class="card">
      <div class="card-content">
        <div class="content">
          Game #{{ game.id.substring(0, 8) }}
          <br>
          <time>{{ formatDate(game.createdAt) }}</time>
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Join</a>
      </footer>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon';
import log from '../plugins/logger';
import { getGames } from '../api/lifeline';

export default {
  name: 'Main',
  data() {
    return {
      games: [],
    };
  },
  methods: {
    formatDate(isoDate) {
      return DateTime.fromISO(isoDate).toLocaleString(DateTime.DATETIME_SHORT);
    },
  },
  mounted() {
    getGames({ accessToken: localStorage.getItem('accessToken') })
      .then((games) => {
        this.games = games;
      })
      .catch((error) => {
        log.error(error);
        this.$toasted.error('Error fetching games');
      });
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}

.card {
  margin: 1em;
}
</style>
