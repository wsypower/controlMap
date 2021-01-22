<template>
  <div v-if="isDetailShow" class="wrapper">
    <div class="title">
      <cg-icon-svg name="ludeng" class="svg_icon ludeng"></cg-icon-svg>
      {{ itemName }}
      <img src="@img/delete.png" alt @click="closeDetail" />
    </div>
    <div class="content nice-scroll">
      <p class="subtitle">设备信息</p>
      <ul>
        <li v-for="(item, index) of infoList" :key="index">【{{ item.name }}】{{ item.value }}</li>
      </ul>
      <p class="subtitle">运行数据</p>
      <div class="grey">
        <img src="@img/volt.png" alt />
        <span>电压（V）：A={{ historyData.Va }} B={{ historyData.Vb }} C={{ historyData.Vc }}</span>
      </div>
      <div class="grey">
        <img src="@img/elec.png" alt />
        <span>电流（A）：A={{ historyData.Ia }} B={{ historyData.Ib }} C={{ historyData.Ic }}</span>
      </div>
      <!-- <p class="subtitle">开关时间</p> -->
      <!-- <div class="time-wrapper"> -->
      <!-- <a-slider
          :step="25"
          :dots="true"
          :marks="timeMarks"
          range
          :default-value="[25, 75]"
          :disabled="false"
          :tipFormatter="returnTip"
        />-->
      <!-- <img src="@img/lightTime.png" alt /> -->
      <!-- </div> -->
      <!-- <p class="subtitle">报警记录</p>
      <a-timeline>
        <a-timeline-item v-for="(item, index) of record" :key="index" :color="index == 0 ? 'blue' : 'lightgray'">
          <p :class="index == 0 ? 'black' : ''">04-02 12:30:39</p>
          <p class="reason" :class="index == 0 ? 'red' : ''">
            【报警原因】
            <span>{{ item.reason }}</span>
          </p>
          <p :class="index == 0 ? 'black' : ''" class="deal-way">
            【处理方式】
            <span>{{ item.way }}</span>
          </p>
        </a-timeline-item>
      </a-timeline> -->
    </div>
  </div>
</template>
<script>
import util from '@/utils/util'
import { lightLogin, lightNewHistory } from '@/api/light/manage'
import moment from 'moment'
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      infoData: {},
      historyData: {},
      itemName: '',
      infoList: [],
      // record: [{
      //     reason: '不亮灯',
      //     way: '智能派单'
      //   },
      //   {
      //     reason: '亮度不够',
      //     way: '误告'
      //   },
      //   {
      //     reason: '破损',
      //     way: '无操作'
      //   },
      //   {
      //     reason: '亮度不够',
      //     way: '误告'
      //   }
      // ],
      // timeMarks: { 0: '0点', 25: '6点', 50: '12点', 75: '18点', 100: '24点' },
      timeMarks: {},
      isDetailShow: false,
      lightToken: null
    }
  },
  mounted() {},
  methods: {
    // returnTip(value) {
    //   if (value == 25) {
    //     return '关灯'
    //   } else if (value == 75) {
    //     return '开灯'
    //   }
    // },
    showDetail(item) {
      this.infoData = item;
      this.itemName = item.name;
      if (item.tp == 'zd') {
        item.type = '终端';
      } else if (item.tp == 'dd') {
        item.type = '单灯';
      } else if (item.tp == 'LH') {
        item.type = '投光灯';
      } else if (item.tp == 'QT') {
        item.type = '高杆灯';
      } else {
        item.type = '';
      }
      if (item.rft == 1) {
        item.status = '在线';
      } else if (item.rft == 0) {
        item.status = '离线';
      } else {
        item.status = '';
      }
      this.infoList = [{
          name: '路段名称',
          value: item.dept
        },
        {
          name: '设备名称',
          value: item.name
        },
        {
          name: '设备类型',
          value: item.type
        },
        {
          name: '安装地点',
          value: item.pst
        },
        {
          name: '最近采集时间',
          value: item.dtm && item.dtm > 0 ? moment(new Date(item.dtm * 1000)).format('YYYY-MM-DD HH:mm:ss') : ''
        },
        {
          name: '设备状态',
          value: item.status
        }
      ];
      this.historyData = { Va: '', Vb: '', Vc: '', Ia: '', Ib: '', Ic: '' };
      this.getDeviceHistory();
      this.isDetailShow = true
    },
    closeDetail() {
      this.isDetailShow = false
    },
    loadLightToken() {
      const userId = util.cookies.get('userId');
      lightLogin({
        userId: userId,
        username: 'lds-zspt-yh01',
        password: 'yhlds123'
      }).then(res => {
        // console.log(res);
        const date = new Date();
        // date.setHours(date.getHours() + 1);
        date.setMinutes(date.getMinutes() + 110);
        this.lightToken = res.token;
        Cookies.set('lightToken', this.lightToken, { expires: date });
        this.getDeviceHistory();
      });
    },
    getDeviceHistory() {
      this.lightToken = Cookies.get('lightToken');
      if (!this.lightToken || this.lightToken.length == 0) {
        this.loadLightToken();
        return;
      }
      const userId = util.cookies.get('userId');
      lightNewHistory({
        userId: userId,
        token: this.lightToken,
        node_khs: this.infoData.kh
      }).then(res => {
        if (res.length > 0) {
          this.historyData = res[0];
          // let ostNo = this.historyData.jst;
          // let ostData = this.historyData.ost[ostNo];
          // this.timeMarks = { 0: '0点', 25: `${ostData.sh}点${ostData.sm}分`, 50: '12点', 75: `${ostData.oh}点${ostData.om}分`, 100: '24点' };
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.wrapper {
  position: fixed;
  right: 15px;
  top: 125px;
  z-index: 999;
  width: 350px;
  max-height: 680px;
  border-radius: 5px;
  box-shadow: 0 0 6px 3px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  .title {
    height: 40px;
    color: #fff;
    background: linear-gradient(to right, #0065eb, #00a5ff);
    display: flex;
    align-items: center;
    padding: 0 20px;
    font-size: 18px;

    .ludeng {
      margin-right: 10px;
    }

    &>img {
      position: absolute;
      right: 20px;
      cursor: pointer;
    }
  }

  .content {
    width: 350px;
    max-height: 640px;
    background: #fff;
    padding: 20px;
    overflow-y: auto;

    .subtitle {
      font-weight: bold;
      padding-left: 10px;
      margin: 10px 0;
      border-left: 4px solid #2b90f3;
    }

    ul {
      list-style: none;

      li {
        padding: 5px 0;
      }
    }

    .grey {
      height: 30px;
      line-height: 30px;
      width: 100%;
      background: #f5f5f5;
      border-radius: 5px;
      margin: 10px 0;

      &>img {
        margin-right: 10px;
      }
    }
  }
}

.black {
  color: #4d4d4d;
  font-weight: bold;
}

.red {
  color: red;
}

.time-wrapper {
  background: #f8f8f8;
  height: 60px;
  width: 290px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ant-slider {
  flex: 0 0 70%;
}
</style>