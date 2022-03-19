<template>
  <div class="box1">
      <div>
          <span>我：</span>
          <span class="card" v-for="item in myCard" :key="item"> {{item}} </span>
          <span style="margin-left:20px;">总点数：</span>
          <span style="color:red">{{scores[0]}}</span>
          <span v-show="isOvers[0]" style="margin-left:20px;color:red">爆死！</span>
      </div>
      <div>
          <div v-for="(item,index) in playersCard" :key="index">
              <span>player{{index + 1}}：</span>
              <span :class="{'isHideCard':!(isOvers[index+1] || isOpen),'isShowCard':isOvers[index+1] || isOpen}" 
              class="card" v-for="(i,index1) in item" :key="index1">{{i}}</span>
              <span v-show="isOvers[index+1] || isOpen" style="margin-left:20px;">总点数：</span>
              <span v-show="isOvers[index+1] || isOpen" style="color:red">{{scores[index+1]}}</span>
              <span v-show="isOvers[index+1]" style="margin-left:20px;color:red">爆死！</span>
          </div>
      </div>
      <div>
          <button :disabled="gameOver||forbidden" @click="getCard">抽牌</button>
          <button :disabled="allOver.length==0||gameOver||forbidden" style="margin-left:20px" @click="getOver">结束</button>
          <button :disabled="!gameOver" style="margin-left:20px" @click="openCards">开牌</button>
      </div>
  </div>
</template>

<script>
export default {
    name: 'points',
    data(){
        return {
            scores: [],
            myCard:[],
            length: 2,
            playersCard: [],
            cards: ['A','2','3','4','5','6','7','8','9','10','J','Q','K'],
            winNum: 21,
            isOvers:[],
            allOver: [],
            gameOver: false,
            isOpen: false,
            forbidden: false,
            gameRunningTime: 700,
        }
    },
    methods: {
        getCard(){
            if (this.allOver.length == 0 || this.allOver[0] == false){
                const num = Math.round(Math.random() * (this.cards.length - 1))
                this.myCard.push(this.cards[num])
                let score = num + 1
                if (this.scores.length == 0){
                    this.scores.push(score)
                }
                else{
                    this.scores[0] += score
                }
            }
            this.aiGetCard()
            this.isOver()
            this.gameOver = true
            for(let i of this.allOver){
                if (!i){
                    this.gameOver = false
                }
            }
            // 只剩一人存活，直接翻牌结束游戏。
            if ((this.isOvers.length == this.length + 1)){
                let gamingPlayer = 0
                for (let i of this.isOvers){
                    if (!i){
                        gamingPlayer += 1
                    }
                }
                if (gamingPlayer == 1){
                    this.gameOver = true
                    this.isOpen = true
                    return
                }
            }
            // “我”爆死，电脑玩家自动玩，然后直接翻牌结束游戏。
            if ((this.isOvers.length == this.length + 1) && this.isOvers[0]){
                this.forbidden = true
                let interval2 = setInterval(() => {
                    this.aiGetCard()
                    this.isOver()
                    this.gameOver = true
                    for(let i of this.allOver){
                        if (!i){
                            this.gameOver = false
                        }
                    }
                    if (this.gameOver){
                        this.isOpen = true
                        clearInterval(interval2)
                    }
                }, this.gameRunningTime);
                return   
            }
        },
        isOver(){
            for(let i in this.scores){
                if (this.isOvers.length != this.scores.length){
                    for (let j in this.scores){
                        this.isOvers.push(false)
                        this.allOver.push(false)
                    }
                }
                if (this.scores[i] > this.winNum){
                    this.isOvers[i] = true
                    this.allOver[i] = true
                }
                else{
                    this.isOvers[i] = false
                }
            }
        },
        aiGetCard(){
            for(let i = 0;i < this.length;i++){
                if (this.allOver.length < this.length + 1 || this.allOver[i+1] == false){
                    if (this.playersCard.length < this.length){
                        const num = Math.round(Math.random() * (this.cards.length - 1))
                        const player = []
                        player.push(this.cards[num])
                        let score = num + 1
                        this.scores.push(score)
                        this.playersCard.push(player)
                    }
                    else{
                        // 策略判断
                        const sub = this.winNum - this.scores[i+1]
                        if (sub >= this.cards.length){
                            // 直接抽卡
                            const num = Math.round(Math.random() * (this.cards.length - 1))
                            this.playersCard[i].push(this.cards[num])
                            let score = num + 1
                            this.scores[i+1] += score
                        }
                        else {
                            const random = Math.round(Math.random() * (this.cards.length - 1))
                            if (random < sub){
                                // 抽卡
                                const num = Math.round(Math.random() * (this.cards.length - 1))
                                this.playersCard[i].push(this.cards[num])
                                let score = num + 1
                                this.scores[i+1] += score
                            }
                            else {
                                // 不抽卡
                                this.allOver[i+1] = true
                            }
                        }
                    }
                }
            }
        },
        getOver(){
            this.allOver[0] = true
            this.forbidden = true
            let interval1 = setInterval(() => {
                this.getCard()
                if (this.gameOver){
                    clearInterval(interval1)
                }
            }, this.gameRunningTime);
        },
        openCards(){
            this.isOpen = true
        }
    },
    computed: {
    }
}
</script>

<style scoped>
.box1{
    margin: 20px;
}
.box1 > div{
    margin-top: 10px;
}
.card{
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-left: 10px;
    margin-top: 10px;
    color: black;
}
.isHideCard{
    background-color: black;
}
.isShowCard{
    background-color: white;
}   
button{
    width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
}
</style>