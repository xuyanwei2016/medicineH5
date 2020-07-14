<template>
  <!--touchDelete-->
    <div class="touchDelete">
      <ul class="booklist">
        <li v-for="(item,index) in list" :key="index" style="border:none">
          <mt-cell-swipe
                  :right="[
              {
                content: '删除',
                style: { background: 'red', color: '#fff',marginLeft:'0',fontSize:'.16rem'},
                handler: () => delBtn(item)
              }
            ]">
            <div class="blockCont">
              <img :src="imgLink(item.cover)" alt="" v-if="item.cover">
              <img src="../assets/img/cover.png" alt="" v-else>
              <div class="info">
                <h1 :id="'tit'+index">{{Ellipsis('tit'+index,2,item.title,'.19')}}</h1>
                <p :id="'intr'+index"  v-if="!item.cover">{{Ellipsis('intr' + index, 2, item.text, '.2')}}</p>
                <div class="other">
                  <h3>{{item.author ? item.author : ''}}</h3>
                  <h2>{{item.createTime}}</h2>
                </div>
              </div>
            </div>
          </mt-cell-swipe>
          <!--<h1>{{item.name}}</h1>
          <p>{{item.cont}}</p>
          <div class="noneCont" @click.stop="delBtn(item)">删除</div>-->

        </li>
      </ul>

    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
              list:[
                {author: "田华咏编",
                  cover: "23ba5d08165e4e51a8ca97fea0f6a1c9",
                  createTime: "2020-06-23 10:34:32",
                  fromId: null,
                  fromTitle: null,
                  id: 1328,
                  intro: "&nbsp;↵↵&nbsp;↵序　　↵与人类进化的整个历史相比，医学史是短暂的。按理说，医药是人类与生俱来的需求，生老病死，无人可免，药草砭石，古已有之。巴甫洛夫也讲过，&ldquo;有了人类，就有了医疗活动&rdquo;。但有据可考的文明史，是从旧石器时代开始的。之前，没有痕迹，也就没有信史。把一般的医药知识和医药经验系统化起来，进行全面总结和理论提升，达到医学的高度，则仅仅是三、五千年以内的事情。以中医为例，先是神农尝百草，一日而遇七十毒。到春秋时代，扁鹊公开提出&ldquo;六不治&rdquo;，宣布医巫决裂。随后《黄帝内经》问世，标志着中医学理论体系全面建立。其它民族民间医学的发展，都有类似的医学&ldquo;原始积累&rdquo;过程，只是因为有的民族没有文字，因而也就缺少文献，历史上创造的医药知识难以积累，更难以做系统的梳理和总结。土家族医学的发展就是如此。但也有一些特殊的经历和条件，使它鲜明地区别于其它民族医学体系。田华咏主编的《土家族医学史》一书，是继1994年《土家族医药学》出版以后又一次全面论述土家族医学的一部专著，是编者在长期深入调查的基础上，参阅大量文史资料，总结民族民间医生的诊疗经验并加以提炼的力作，也是近年来我国少数民族传统医学继承发展工作取得的成果之一。↵土家族有人口802万人（2000年普查数），在我国56个民族中占第七位，仅次于汉、壮、满、回、黄、维吾尔族。土家族历史悠久，人口众多，在半个世纪前却鲜为人知。直到1950年，湘西永顺县有一位名叫田心桃的女教师到北京开会，时有中央领导人问她是什么民族，她说：&ldquo;我是土家，不是苗族。&rdquo;同时向中央领导介绍了土家族的语言和习俗，提出了&ldquo;承认土家族是一个单一民族&rdquo;的请求。经多方调查考证，至1956年底，国家正式&ldquo;批准土家为一个民族&rdquo;。这个中原因，我想应与土家族所处的地理环境相对封闭有关。↵根据土家族族源考证，土家族的来源，曾有巴人说、乌蛮说、人说、土著说等多种学说（《湘西民族志》，第15页）。近几年考古发掘越来越倾向于&ldquo;土家族是世代居住在湘、鄂、渝、黔边区武陵山脉一带的土著民族&rdquo;。这武陵山脉一带土家族（还间有苗、侗等民族）分布地区是祖国大好河山的一块腹地，面积约10万平方公里，相当于一个浙江省大小。这里历史上交通闭塞，民风淳厚，&ldquo;蛮不出境，汉不入峒&rdquo;，显然是一个世外桃源。其内部&ldquo;既不知有汉&rdquo;，外部也不知土家。在这样一个地方，人民一旦得病，只能靠自己解脱。从神到巫，从巫到医，神药两解。当地的药物资源非常丰富，&ldquo;野草满山俱入药，神农强半未知名&rdquo;。这一切都为当地传统医药的发展提供了必要性和可能性。↵《土家族医学史》紧紧掌握传统医药的人文特点，从历史学、文化学、民族学的角度对土家族医药产生的历史文化背景做了全面论述，其资料收集之丰富，该是编者几十年心血之积聚。但更珍贵的是对土家族医学特点的总结，其中包括基础理论、诊法、治则、疗法、药物、养生等等，在前人工作的基础上均有所丰富，有所发展，使土家族医学体系的建设更加成熟，日臻完善。这一些诊法、疗法、技法和用药经验，是民族民间医学中最珍贵、最实用的部分。它的特点是群众创造，资源丰富，简便验廉，具有很高的临床价值和科研价值。现在不少人用现代医学的观点和方法去审视民族民间医学，斥之曰&ldquo;不科学&rdquo;，或称之谓&ldquo;无证据&rdquo;，轻易地予以否定，其实他们并没有做深入的了解，耐心地用实践检验这一切。民族医药在古代社会中形成和发展，自有其历史的局限性、地域的局限性和民族的局限性，这是时间、空间、人间的变化造成的。一个民族在几千年中积累下来的医药知识，是一笔巨大的财富，同样是一个医药学的宝库，是不容忽视和抹杀的。《土家族医学史》的成就，是中国传统医学大厦的一块基石，是中国传统医学多元性、丰富性的一个证据，也是土家族人民对祖国卫生事业的历史贡献，值得后人赓续发扬，造福社会。↵诸国本↵2004年9月18日↵诸国本同志，现任中国民族医药学会会长，国家中医药管理局原副局长",
                  isPdf: 0,
                  isStatus: 0,
                  message: null,
                  messageCode: null,
                  objectId: "20440a651c9e4b4abc09beb8d96b7be8",
                  objectType: "2-1",
                  pdf: null,
                  text: null,
                  title: "土家族医学史"},
                {author: "朱国豪等主编",
                  cover: "05c32c10b58545a9a7fa6044cd22d181",
                  createTime: "2020-06-23 10:34:24",
                  fromId: null,
                  fromTitle: null,
                  id: 1327,
                  intro: "&nbsp;↵↵&nbsp;↵前言　　↵在我国武陵山和大娄山、大巴山、巫山余脉切入的黔、湘、渝、鄂四省边区近10万平方公里的土地上，世居着一个古老的民族&mdash;&mdash;&ldquo;毕兹卡&rdquo;土家族。她有着悠久的历史和灿烂的文化。根据我国2004年全国人口统计，全国有土家族800多万人，居全国少数民族的第六位。↵当人们踏上&ldquo;峰三千，水八百，养在深闺人未识，一举成名天下知&rdquo;的张家界这座原始的山水花园和登上世界人与自然生物圈（MAB）保护网成员武陵山主峰梵净山的&ldquo;金顶&rdquo;，在&ldquo;万卷书&rdquo;中翻阅着我国武陵山土家族悠久的民族历史、民族文化、民族经济、民族风情之后发现，这块宝地上最珍贵的、对当地人民健康有较大贡献的土家族医药更具独特的魅力，这是土家人民几千年来在这块土地上繁衍生息，与疾病抗争的过程中所形成的深厚的医学文化积淀，是珍贵的民族文化遗产，是我国传统医药的重要组成部分。↵为了打开深藏在土家民间的土家族医药宝库，在党和国家&ldquo;关于继承和发扬民族医药学意见&rdquo;的通知精神指引下，1984年至1992年在全国中药资源普查中，黔、湘、渝、鄂四省市边区的广大民族医药工作者作出了有益的探索。1993年3月在贵州省卫生厅、省民委支持下成立了&ldquo;贵州省土家族医药调查研究科研课题组&rdquo;后，课题组自筹资金把调研范围扩大到湘、渝、鄂三省边区土家族聚居较多的地、州、县、市进行广泛深入的基础调研工作，以便全面反映土家族医药的状况。由于土家族没有文字，其医药文化大多流传于民间，通过家传、师传，口传心授，代代相承，且大都较为保守，不肯轻传，这给我们的工作带来了许多困难。欣慰的是，很多老土家医和研究土家族医药的专家、学者为我们的工作提出了不少的宝贵意见并提供了许多原始的第一手资料，使我们受益匪浅。历时10多年的土家族医药调查研究工作，让我们对土家族医药有了一个较为完整系统的了解，深感土家族医药内容丰富，特色突出，有较高的研究价值。↵在贵州省民委、省卫生厅和贵阳中医学院、贵州省中医药研究院、贵州省土家族研究会领导的关怀下，2003年在贵阳中医学院民族医药研究所成立了《土家族医药》编辑委员会。两年多来，编委会全体同志努力工作，本着求真务实、严肃严谨的科学精神，认真归纳和总结朱国豪课题组长提供整理的全部调研资料和四省边区老土家医之精典论述及临床实践经验，剔除了那些艰涩难解、没有临床意义的病名、病症、药名称谓。在本书的编写过程中，我们力求做到去粗取精，去伪存真，保持特色，利于指导临床和开发利用，使之发扬光大；努力做到真实、科学、简明、适用。现三易其稿，终成《土家族医药》一书。↵任何理论的发现都是建立在实践的基础上的。恩格斯指出：&ldquo;一个民族要站在科学的最高峰，就一刻也不能没有理论思维。&rdquo;（《反杜林论&middot;旧序》）土家族医药也不例外。在长期的医学实践中总结升华土家民族自己特色的医药理论，如《土王真药本草》中记载的七十二参、七十二七、七十二莲、三十六风、三十六还阳、三十六蜈蚣、三十六血和&ldquo;一百单八将&rdquo;即一百零八种行之有效的土家民族药，并有七十二症、七十二风、七十二痧、三十六痨、三十六疮疡、三十六惊、三十六伤疾和&ldquo;一百单八症&rdquo;即一百零八种常见病的诊断、治疗和方药的感性辩证医药理论等。后期，汪古珊《医药萃精》等土家医提出&ldquo;三元论&rdquo;。&ldquo;三元论&rdquo;认为：人的生命是天、地、水之元气化生的世间最精灵、智慧的生命。水&mdash;&mdash;是产生人体生命最宝贵的物质基础；地&mdash;&mdash;是人体生命活动的场所；天&mdash;&mdash;是人体生命活动的空间。&ldquo;三元&rdquo;即&ldquo;天元、地元、水元&rdquo;。脑、心、肺居上为天；脾、胃居中为地；肝、肾居下为水。并提出&ldquo;以阳统阴&rdquo;，&ldquo;阳盛则壮，阴盛则老&rdquo;的生命根本形式和三元体架、三元脏器、三元孔窍、三元物质的理性哲学辩证医学理论和药学的&ldquo;三元性&rdquo;理论。这是土家族医药在几千年实践&mdash;&mdash;理论&mdash;&mdash;再实践&mdash;&mdash;再理论的千回百折中锤炼出来的理论基石，奠定了土家族医药的理论基础。↵本书共分六章，前五章分别对土家族医药的医药发展简史、医学基础理论、医学临床症治、常用土家族药物、学术价值和开发前景展望进行了论述和介绍。土家族医药内容丰富，特色明显，如诊断有一看、二问、三听、四摸、五号、六指、七掌、八卦。治疗方法，特别是外治法达二十四种之多，如荨麻螫刺疗法、魔球按摩疗法、太乙神针疗法、痛症超导诊疗法，都是其他民族没有的方法。临床病症选录的一百零八种病症，包括内、外、妇、儿最常见的疾病，且病名形象通俗，简明易懂易记，如白虎症（中风），吼包症（哮喘），羊毛痧症（急腹痛），坐骨风症（坐骨神经痛），肺痨（肺结核），重伤风（流感）等。↵二十一世纪是人类科学实现人与自然协调、和谐发展的崭新世纪，人类&ldquo;回归自然，返璞归真&rdquo;运用纯天然药物促进人类健康文明的新时代已经到来。土家族医药的挖掘整理、理论研究、临床实践、开发利用已经展示出美好的前景。我们一定要在党和国家&ldquo;发展现代医药和我国传统医药&rdquo;方针的指导下，充分利用现代医药科学和各民族传统医药科学研究的先进方法、成果、信息，加快土家族医药研究开发的步伐，让土家族医药为人类健康、丰富我国传统医药宝库作出更大的贡献。↵土家族医药蕴藏在民间几千年，一定还有很多宝贵的东西等待我们去发现，去探索，去挖掘。《土家族医药》一书的出版，只是我们迈出的第一步。但由于我们水平有限，疏漏与不足在所难免。恳望慧眼卓识的领导、专家、学者、读者不吝赐教，批评指正。↵《土家族医药》编辑委员会↵2016年8月",
                  isPdf: 0,
                  isStatus: 0,
                  message: null,
                  messageCode: null,
                  objectId: "dbc3d4fa859f46c9b3c5e56b4cb8a9d3",
                  objectType: "2-1",
                  pdf: null,
                  text: null,
                  title: "土家族医药"},
                {
                  author: "彭芳胜 彭慧娟著",
                  cover: "6b104afdc1b44aa996580f0991ae2c90",
                  createTime: "2020-06-23 10:34:18",
                  fromId: null,
                  fromTitle: null,
                  id: 1326,
                  intro: "乃著者宿愿也。↵彭芳胜↵2012 年2 月12 日",
                  isPdf: 0,
                  isStatus: 0,
                  message: null,
                  messageCode: null,
                  objectId: "4ca9d49f89204fd28529e3a27eb00c6b",
                  objectType: "2-1",
                  pdf: null,
                  text: null,
                  title: "土家医毒气病学",
                },
                {
                  author: "《苗医药教材》编写组",
                  cover: "635a12948d154275acea787e6316d1be",
                  createTime: "2020-06-23 10:34:11",
                  fromId: null,
                  fromTitle: null,
                  id: 1325,
                  intro: null,
                  isPdf: 0,
                  isStatus: 0,
                  message: null,
                  messageCode: null,
                  objectId: "000a5f3ecd4c4099ade019c173377b2c",
                  objectType: "2-1",
                  pdf: null,
                  text: null,
                  title: "苗医药系列教材",
                },
                {
                  author: "彭再生主编",
                  cover: "8e74cb3a2e6c480eb39938e9646bdccf",
                  createTime: "2020-06-23 10:34:04",
                  fromId: null,
                  fromTitle: null,
                  id: 1324,
                  intro: "等一些盅虫之药。其治病主要以跳神为主，药以引之。其医疗技术的传承主要是传男不传女和带养老徒弟为主（无儿女带一个徒弟养老），此外，就是&ldquo;扒老二&rdquo;药，也就是偷盗者所用之药。因为山大人稀，山匪盗贼较多，挨打的机会也就多，配用一些跌打损伤药，以备伤时所用。↵民国年间，苗族医药无长足发展，仍处于自成派系的家传承袭格局。",
                  isPdf: 0,
                  isStatus: 2,
                  message: "该资源暂不支持在线购买或阅读全文",
                  messageCode: 1,
                  objectId: "2757bc5822014ccdad1ae582970f265a",
                  objectType: "2-1",
                  pdf: null,
                  text: null,
                  title: "湖北苗药",
                },
                {
                  author: "邓泽，侯凤飞主编",
                  cover: "ee0d20827cce49f390dca7e1583b11fc",
                  createTime: "2020-06-23 10:33:58",
                  fromId: null,
                  fromTitle:null,
                  id: 1323,
                  intro: "编　者↵2011年7月",
                  isPdf: 0,
                  isStatus: 0,
                  message: null,
                  messageCode: null,
                  objectId: "24a4ed1a22624f9f8dee2d0e3b327c96",
                  objectType: "2-1",
                  pdf: null,
                  text: null,
                  title: "佤族医药",
                }
                ],
              rightButtons:[
                {
                  content: 'Delete',
                  style: { background: 'red', color: '#fff' },
                  handler: () => this.$messagebox('delete')
                }
              ],
            }
        },
        created() {
        },
        watch: {},
        methods: {
          leftButtonHandler(evt) {
            console.log(123);
          },
          delBtn(item){
            console.log(1111,item)
          },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.touchDelete{
  /*height: 100%;*/
  overflow: scroll;
  width: 100%;
  background: #f2f2f2;

  .booklist {
    width: 3.75rem;
    padding: .65rem 0 0;
    li {
      margin-right: 0;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .blockCont {
        margin: .15rem .12rem 0 .12rem;
        padding-bottom: .1rem;
        border-bottom: 1px solid #EEEEEE;
        width: 3.51rem;
        display: flex;
        justify-content: space-between;
        img {
          width: 0.8rem;
          height: 1.15rem;
        }
        .info {
          width: 2.54rem;
          position: relative;
          h1 {
            font-size: .16rem;
            color: #222222;
            height: .28rem;
            line-height: .28rem;
            .lineone
          }
          p {
            font-size: .13rem;
            color: #808287;
            line-height: .19rem;

          }
          .other {
            width: 100%;
            position: absolute;
            bottom: .05rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: .17rem;
            h3 {
              width: 1.35rem;
              height: .17rem;
              line-height: .17rem;
              color: #1A6DC2;
              font-size: .13rem;
              font-weight: normal;
              .lineone
            }
            h2 {
              text-align: right;
              width: 1.15rem;
              height: .17rem;
              line-height: .17rem;
              display: inline-block;
              color: #BCC1CB;
              font-weight: normal;
              font-size: 0.11rem;
            }
          }
        }
      }
      .noneCont {
        float: right;
        width: .6rem;
        height: 100%;
        background-color: #EE5931;
        right: 0;
        top: 0;
        position: absolute;
        color: #FFFFFF;
        font-size: .17rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }

    }

  }
  .lineone {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
