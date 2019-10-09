<template>
  <div class="home">
    <div class="container">
      <PoolList />

      <div class="content">
        <h2 class="title">What's this</h2>
        <ul>
          <li>ランクマッチの Pick & Ban でパーティーメンバーのヒーロープール (得意なヒーローや使えるヒーロー) を確認するためのツールです</li>
          <li>パーティーメンバーのヒーロープールを把握して構成事故を減らしましょう</li>
        </ul>
      </div>

      <div class="content">
        <h2 class="title">How to use</h2>
        <ol type="1">
          <li>
            自分が得意なヒーローや使えるヒーローを登録する
            <br />※ 持っていても苦手なヒーローなどは登録しなくてもよい
          </li>
          <li>パーティメンバーのヒーロープールを表示して Pick & Ban で活用する</li>
        </ol>
      </div>

      <div class="content">
        <p>※ 現在、登録後の修正や削除はできませんので、間違えて登録した方は Discord でモリコまで DM かメンションください</p>
      </div>
    </div>
  </div>
</template>

<script>
import PoolList from "@/components/PoolList.vue";

export default {
  name: "home",
  components: { PoolList }
};
</script>

<style scoped>
</style>
