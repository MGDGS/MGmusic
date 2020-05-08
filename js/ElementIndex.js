//首页组件
var index = {
    data() {
        return {
            songList: '',
            song: ''
        }
    },
    template: '<div class="recommand">' +
        '<div class="recommandTitle">推荐歌单</div>' +
        '<div class="recommandContent">' +
        '<div class="songList" v-for="site in songList" @click="gotoSonglistdetails(site[\'songmenu_id\'])">' +
        '<div class="listCover"><img :src="site[\'songmenu_cover\']"></div>' +
        '<div class="listName">{{site["songmenu_name"]}}</div>' +
        '</div>' +
        '</div>' +
        '<div class="recommandTitle">推荐歌曲</div>' +
        '<div class="recommandContent">' +
        '<table class="songTable">' +
        '<tr>' +
        '<th>id</th><th>歌曲</th><th>时长</th><th>歌手</th><th></th><th></th>' +
        '</tr>' +
        '<tr v-for="(site,index) in song">' +
        '<td class="songId">{{++index}}</td>' +
        '<td class="songName"><a @click="gotoSongdetails(site.song_id)">{{site["song_name"]}}</router-link></td>' +
        '<td class="songDuration">{{site["song_duration"]}}</td>' +
        '<td class="songSinger"><a>{{site["song_singer"]}}</a></td>' +
        '<td class="songPlay"><a @click="musicPlay(site[\'song_id\'])">播放</a></td>' +
        '<td class="songCollect"><a @click="musicCollect(site[\'song_id\'])">收藏</a></td>' +
        '</tr>' +
        '</table></div>' +
        '</div>',
    methods: {
        gotoSonglistdetails(songListid) {
            this.$router.push({path: '/songListdetails', query: {songListid: songListid}})
        },
        musicPlay(songid) {
            this.$emit('musicplay', {data: songid});
        },
        musicCollect(songid) {
            this.$emit('musiccollect', {data: songid});
        },
        gotoSongdetails(id) {this.$router.push({path: '/songDetails', query: {id: id}});},
        recommendSonglist() {
            axios
                .get('RecommendIndexSongList.php')
                .then(response => (this.songList = response.data))
                .catch(function (error) {
                    console.log(error);
                })
        },
        recommendSong() {
            axios
                .get('RecommendIndexSong.php')
                .then(response => (this.song = response.data))
                .catch(function (error) {
                    console.log(error);
                })
        }
    },
    mounted() {
            this.recommendSong();
            this.recommendSonglist();
    }
}

//曲库组件
var SongPage = {
    data() {
        return {
            singerAbb: [],
            singerCategory: 'all',
            singerSong: 'all',
            singerList: [],
            songList: []
        }
    },
    template: '<div class="songPage">' +
        '<div class="listTitle">所有歌曲</div>' +
        '<div class="singerContent">' +
        '<div class="singerAbb"><span @click="singerCategory=\'all\',singerSong=\'all\'">all</span><span v-for="site in singerAbb" @click="singerCategory=site">{{site}}</span></div>' +
        '<div class="singerName"><span>歌手：</span><div class="singerLoad"><a v-for="site in singerList" @click="singerSong=site.song_singer">{{site["song_singer"]}}</a></div></div>' +
        '</div>' +
        '<div class="sP-songList">' +
        '<table class="songTable">' +
        '<tr>' +
        '<th>id</th><th>歌曲</th><th>时长</th><th>歌手</th><th></th><th></th>' +
        '</tr>' +
        '<tr v-for="(site,index) in songList">' +
        '<td class="songId">{{++index}}</td>' +
        '<td class="songName"><a @click="gotoSongdetails(site.song_id)">{{site["song_name"]}}</a></td>' +
        '<td class="songDuration">{{site["song_duration"]}}</td>' +
        '<td class="songSinger"><a>{{site["song_singer"]}}</a></td>' +
        '<td class="songPlay"><a @click="musicPlay(site[\'song_id\'])">播放</a></td>' +
        '<td class="songCollect"><a @click="musicCollect(site[\'song_id\'])">收藏</a></td>' +
        '</tr>' +
        '</table>' +
        '</div>' +
        '</div>',
    computed: {
        AforZ() {
            for (var i = 97; i < 123; i++) {
                this.singerAbb.push(String.fromCharCode(i));
            }
        }
    },
    watch: {
        singerCategory() {
            this.singerLoad(this.singerCategory);
        },
        singerSong() {
            this.songLoad(this.singerSong);
        }
    },
    methods: {
        singerLoad(category) {
            axios
                .get('LoadSingerList.php', {
                    params: {category: category}
                })
                .then(response => (this.singerList = response.data))
                .catch(function (error) {
                    console.log(error)
                });
        },
        songLoad(singer) {
            axios
                .get('LoadSingerSong.php', {
                    params: {singer: singer}
                })
                .then(response => (this.songList = response.data))
                .catch(function (error) {
                    console.log(error)
                });
        },
        musicPlay(songid) {
            this.$emit('musicplay', {data: songid});
        },
        musicCollect(songid) {
            this.$emit('musiccollect', {data: songid});
        },
        gotoSongdetails(id) {
            this.$router.push({path: '/songDetails', query: {id: id}})
        }
    },
    created() {
        this.AforZ;
    },
    mounted() {
        this.singerLoad(this.singerCategory);
        this.songLoad(this.singerSong);
    }
}


//歌单组件
var SongList = {
    data() {
        return {
            loadSonglist: '',
            showCategory: true,
            tagLanguage: ["华语", "英语", "日语", "韩语"],
            tagStyle: ["流行", "摇滚", "电音", "民谣","说唱","古风","后摇","轻音乐","R&B/Soul"]
        }
    },
    template: '<div class="songListpage">' +
        '<div class="listTitle">全部歌单' +
        '<span @click="showCategory=!showCategory" class="categorySpan categoryClick" @click="songListcategory(\'all\')">所有分类</span>' +
        '<span class="categorySpan">语种：</span><span v-for="site in tagLanguage" class="categorySpan categoryClick" @click="songListcategory(site)">{{site}}</span>' +
        '<span class="categorySpan">风格：</span><span v-for="site in tagStyle" class="categorySpan categoryClick" @click="songListcategory(site)">{{site}}</span>' +
        '</div>' +
        '<div class="allSonglist">' +
        '<div class="songListload" v-for="site in loadSonglist">' +
        '<div class="loadCover" @click="gotoSonglistdetails(site[\'songmenu_id\'])"><img :src="site[\'songmenu_cover\']"></div><div class="listLoadname">{{site["songmenu_name"]}}</div>' +
        '</div>' +
        '</div>' +
        '</div>',
    methods: {
        allSonglist() {
            axios
                .get('LoadAllSongList.php')
                .then(response => (this.loadSonglist = response.data))
                .catch(function (error) {
                    console.log(error)
                });
        },
        gotoSonglistdetails(songListid) {
            this.$router.push({path: '/songListdetails', query: {songListid: songListid}})
        },
        songListcategory(category) {
            axios
                .get('LoadSongListForCategory.php', {
                    params: {category: category}
                })
                .then(response => (this.loadSonglist = response.data))
                .catch(function (error) {
                    console.log(error)
                })
        }
    },
    mounted() {
        this.allSonglist()
    }
}

//动态组件
var MomentPage = {
    props: ["shareresult"],
    data() {
        return {
            userMsg: '',
            randomUser: '',
            momentMsg: '', //动态列表
            modalStatus: false, //弹窗状态
            contentStatus: false, //内容编辑状态，false为文本编辑，true为歌曲选择
            addContent: '点击添加音乐', //
            contentText: '', //发布的文本内容
            contentMusicid: '',//选择的歌曲/歌单id
            contentSearch: '', //查询音乐列表
            searchRang: 'song',
            searchList: '',
            searchId: '', //选择的歌曲/歌单id
            randomBtnshow: true
        }
    },
    template: '<div class="momentPage">' +
        //动态加载
        '<div class="momentContent">' +
        '<div class="listTitle">动态广场<u @click="share">发表新动态</u></div>' +
        '<div class="momentMsg">' +
        '<div class="userMoment" v-for="site in momentMsg">' +
        '<div class="momentAvatar" @click="gotoUserpage(site.moment_user)"><img :src="site[\'user_avatar\']"></div>' +
        '<div class="momentDetails"> ' +
        '<div>{{site["user_name"]}}</div><div>{{site["moment_time"]}}</div><div>{{site["moment_content"]}}</div>' +
        '<div class="momentSong" v-if="site[\'moment_songid\']" @click="musicPlay(site.moment_songid)">' +
        '<div><img src="img/play.png"></div><div class="momentSongmsg">{{site["song_name"]}}-{{site["song_singer"]}}</div><div class="momentTip">音乐</div>' +
        '</div>' +
        '<div class="momentSong" v-if="site[\'moment_songmenuid\']"  @click="gotoSonglistdetails(site[\'moment_songmenuid\'])">' +
        '<div><img :src="site[\'songmenu_cover\']"></div><div  class="momentSongmsg">{{site["songmenu_name"]}}</div><div class="momentTip">歌单</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        //侧边栏信息
        '<div class="asideContent">' +
        //个人信息
        '<div class="ownMsg">' +
        '<div class="ownAvatar" @click="gotoUserpage(userMsg.user_id)"><img :src="userMsg[\'user_avatar\']"></div>' +
        '<div class="ownContent">' +
        '<div class="ownName">{{userMsg["user_name"]}}</div>' +
        '<div class="ownInteract">动态{{userMsg["moments_count"]}} | 关注{{userMsg["concern"]}} | 粉丝{{userMsg["fans"]}}</div>' +
        '<div class="ownLable">{{userMsg["user_lable"]}}</div>' +
        '</div>' +
        '</div>' +
        //随机推荐的用户
        '<div class="randomMsg">' +
        '<div class="listTitle">推荐用户</div>' +
        '<div class="randomContent"  v-for="site in randomUser">' +
        '<div class="randomAvatar" @click="gotoUserpage(site.user_id)"><img :src="site[\'user_avatar\']"></div>' +
        '<div class="randomUser"><div>{{site["user_name"]}}</div><div>{{site["user_lable"]}}</div></div>' +
        '<div class="randomBtn" v-show="!parseInt(site.concern)" @click="concernUser(site.user_id)" :id="\'concern\'+site.user_id">关注</div>' +
        '<div class="randomBtn" v-show="parseInt(site.concern)" :id="\'chat\'+site.user_id">私信</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>',
    methods: {
        loadUser() {
            axios
                .get('LoadUserInformation.php',{params: {userid: $.cookie('userid')}})
                .then(response => (this.userMsg = response.data))
                .catch(function (error) {
                    console.log(error)
                })
        },
        loadRandom() {
            axios
                .get('RecommendRandUser.php')
                .then(response => (this.randomUser = response.data))
                .catch(function (error) {
                    console.log(error)
                })
        },
        loadMoment() {
            axios
                .get('LoadAllMoments.php')
                .then(response => (this.momentMsg = response.data))
                .catch(function (error) {
                    console.log(error)
                })
        },
        gotoSonglistdetails(songListid) {
            this.$router.push({path: '/songListdetails', query: {songListid: songListid}})
        },
        //关注用户
        concernUser(otherid) {
            axios
                .get('UserConcernOther.php', {
                    params: {otherid: otherid}
                })
                .then(response => (alert(response.data)))
                .catch(function (error) {
                    console.log(error)
                });
            $('#concern'+otherid).hide();
            $('#chat'+otherid).show();
        },
        musicPlay(songid) {
            this.$emit('musicplay', {data: songid});
        },
        share() {
            let num = Math.random();
            this.$emit('share', {data: num});
        },
        gotoUserpage(id) {
            this.$router.push({path: '/UserPage',query: {userid:id}})
        }
    },
    watch: {
        shareresult() {
            this.loadMoment();
        }
    },
    mounted() {
        this.loadUser();
        this.loadRandom();
        this.loadMoment()
    }
}

//个人音乐组件
var UserMusic = {
    data() {
        return {
            createdList: "",  //创建的歌单列表
            collectedList: "",  //收藏的歌单列表
            allListid: [], //所有列表id
            details: "",
            listSong: "",
            createPopshow: false,
            createName: '',
            createReturn: '',
            btnA: false,
            btnB: false
        }
    },
    template: '<div class="userMusic">' +
        //新建歌单
        '<div class="background" v-if="createPopshow">' +
        '<div class="createPop">' +
        '<div class="listTitle">新建歌单</div>输入歌单名称：<input v-model="createName">' +
        '<div><span @click="createSonglist">确定</span><span @click="createPopshow=false">取消</span></div></div>' +
        '</div>' +
        //歌单列表
        '<div class="songListlist">' +
        '<div class="listTitle">创建的歌单<a class="create" @click="createPopshow=true">新建歌单</a></div>' +
        '<div class="createdList" v-for="site in createdList" @click="songListdetails(site[\'songmenu_id\']),btnA=true,btnB=false">' +
        '<div class="littleCover"><img :src="site[\'songmenu_cover\']" ></div>' +
        '<div class="littleName">{{site["songmenu_name"]}}</div>' +
        '</div>' +
        '<div class="listTitle">收藏的歌单</div>' +
        '<div class="collectList" v-for="site in collectedList" @click="songListdetails(site[\'songmenu_id\']),btnB=true,btnA=false">' +
        '<div class="littleCover"><img :src="site[\'songmenu_cover\']" ></div>' +
        '<div class="littleName">{{site["songmenu_name"]}}</div>' +
        '</div>' +
        '</div>' +
        //歌单信息
        '<div class="songListcontent">' +
        '<div class="uM-songListdetails" v-model="details">' +
        '<div class="songListcover" @click="gotoSonglistdetails(details.songmenu_id)"><img :src="details[\'songmenu_cover\']"></div>' +
        '<div class="songListmsg">' +
        '<div class="songListname">{{details["songmenu_name"]}}</div>' +
        '<div class="songListuser"><div class="createdAvatar"  @click="gotoUserpage(details.songmenu_user)"><img :src="details[\'user_avatar\']"></div><div class="createdName">{{details["user_name"]}}</div><div class="createdTime">创建时间：{{details["createdate"]}}</div></div>' +
        '<div class="songListtag">标签：{{details["tag_language"]}} {{details["tag_style"]}}</div>' +
        '<div class="songListlable">介绍：{{details["songmenu_lable"]}}</div>' +
        '<div class="uM-btn"><a v-show="btnA" @click="delSonglist">删除</a><a v-show="btnB" @click="remSonglist">取消收藏</a><a @click="gotoEditsonglist" v-show="btnA">编辑</a></div>' +
        '</div>' +
        '</div>' +
        '<div class="songListsong">' +
        '<div class="listTitle">歌曲列表</div>' +
        '<table class="songTable">' +
        '<tr>' +
        '<th>id</th><th>歌曲</th><th>时长</th><th>歌手</th><th></th><th></th>' +
        '</tr>' +
        '<tr v-for="(site,index) in listSong">' +
        '<td class="songId">{{++index}}</td>' +
        '<td class="songName"><a @click="gotoSongdetails(site.song_id)">{{site["song_name"]}}</a></td>' +
        '<td class="songDuration">{{site["song_duration"]}}</td>' +
        '<td class="songSinger"><a>{{site["song_singer"]}}</a></td>' +
        '<td class="songPlay"><a @click="musicPlay(site[\'song_id\'])">播放</a></td>' +
        '<td class="songCollect"><a @click="musicCollect(site[\'song_id\'])">收藏</a></td>' +
        '</tr>' +
        '</table>' +
        '</div>' +
        '</div>' +
        '</div>',
    methods: {
        loadUsercreated() {
            axios
                .get('LoadUserCreated.php', {
                    params: {userid: $.cookie("userid")}
                })
                .then(response => (this.createdList = response.data))
                .catch(function (error) {
                    console.log(error)
                });
        },
        loadUsercollected() {
            axios
                .get('LoadUserCollected.php', {
                    params: {userid: $.cookie("userid")}
                })
                .then(response => (this.collectedList = response.data))
                .catch(function (error) {
                    console.log(error)
                });
        },
        songListdetails(songListid) {
            axios
                .get('LoadSongListInformation.php', {
                    params: {songmenuid: songListid}
                })
                .then(response => (this.details = response.data))
                .catch(function (error) {
                    console.log(error)
                });
            axios
                .get('LoadSongListCollected.php', {
                    params: {songmenuid: songListid}
                })
                .then(response => (this.listSong = response.data))
                .catch(function (error) {
                    console.log(error)
                });
        },
        musicPlay(songid) {
            this.$emit('musicplay', {data: songid});
        },
        musicCollect(songid) {
            this.$emit('musiccollect', {data: songid});
        },
        createSonglist() {
            if (this.createName.trim() == '') {
                alert("歌单名不能为空！");
            } else {
                axios
                    .get('UserCreateSongList.php', {
                        params: {songlistname: this.createName}
                    })
                    .then(response => (this.createReturn = response.data))
                    .catch(function (error) {
                        console.log(error)
                    });
            }
        },
        gotoEditsonglist() {
            this.$router.push({
                path: '/editSonglist', query: {songListid: this.details.songmenu_id}
            })
        },
        delSonglist() {
            var con = confirm("确认删除该歌单？");
            if (con) {
                axios
                    .get('UserDeleteSongList.php',{params:{songmenuid:this.details.songmenu_id}})
                    .then(response => (console.log(response.data),this.loadUsercreated(),this.songListdetails(this.allListid[0])))
                    .catch(
                        function (error) {
                            console.log(error)
                        })
            }
        },
        remSonglist() {
            var con = confirm("不再收藏该歌单？");
            if (con) {
                axios
                    .get('UserRemoveSonglist.php',{params:{songmenuid:this.details.songmenu_id}})
                    .then(response => (console.log(response.data),this.loadUsercollected(),this.songListdetails(this.allListid[0])))
                    .catch(
                        function (error) {
                            console.log(error)
                        })
            }
        },
        gotoSongdetails(id) {
            this.$router.push({path: '/songDetails', query: {id: id}})
        },
        gotoUserpage(id) {
            this.$router.push({path: '/UserPage',query: {userid:id}})
        },
        gotoSonglistdetails(songListid) {
            this.$router.push({path: '/songListdetails', query: {songListid: songListid}})
        }
    },
    watch: {
        createdList() {
            if (this.createdList.length > 0) {
                for (let i = 0; i < this.createdList.length; i++) {
                    this.allListid.push(this.createdList[i].songmenu_id);
                }
            }
        },
        collectedList() {
            if (this.collectedList.length > 0) {
                for (let i = 0; i < this.collectedList.length; i++) {
                    this.allListid.push(this.collectedList[i].songmenu_id);
                }
            }
        },
        allListid() {
            this.songListdetails(this.allListid[0]);
        },
        createReturn() {
            if (this.createReturn == "新建失败") {
                alert(this.createReturn);
                this.createReturn = "";
            } else {
                this.loadUsercreated();
                this.createPopshow = false;
                this.createName = '';
                this.createReturn = "";
            }
        }
    },
    mounted() {
        this.loadUsercreated();
        this.loadUsercollected();
    }
}

//编辑歌单
var editSonglist = {
    data() {
        return {
            songListid: this.$route.query["songListid"],
            songListmsg: '',
            showChoicetag: false,
            saveReturn: ''
        }
    },
    template: '<div class="editSonglist">' +
        //选择标签
        '<div class="background" v-if="showChoicetag">' +
        '<div class="choiceTagdiv">' +
        '<div class="listTitle">选择标签</div>' +
        ' <div class="tagForm">\n' +
        '语言：' +
        '<input type="radio" name="language" value="" v-model="songListmsg.tag_language">无' +
        '                    <input type="radio" name="language" value="华语" v-model="songListmsg.tag_language">华语' +
        '                    <input type="radio" name="language" value="英语" v-model="songListmsg.tag_language">英语' +
        '                    <input type="radio" name="language" value="韩语" v-model="songListmsg.tag_language">韩语' +
        '                    <input type="radio" name="language" value="日语" v-model="songListmsg.tag_language">日语' +
        '                </div>' +
        '                <div class="tagForm">' +
        '风格：' +
        '<input type="radio" name="style" value="" v-model="songListmsg.tag_style">无' +
        '                    <input type="radio" name="style" value="流行" v-model="songListmsg.tag_style">流行' +
        '                    <input type="radio" name="style" value="摇滚" v-model="songListmsg.tag_style">摇滚' +
        '                    <input type="radio" name="style" value="电音" v-model="songListmsg.tag_style">电音' +
        '                    <input type="radio" name="style" value="民谣" v-model="songListmsg.tag_style">民谣<br>' +
        '                    <input type="radio" name="style" value="说唱" v-model="songListmsg.tag_style">说唱' +
        '                    <input type="radio" name="style" value="古风" v-model="songListmsg.tag_style">古风' +
        '                    <input type="radio" name="style" value="后摇" v-model="songListmsg.tag_style">后摇' +
        '                    <input type="radio" name="style" value="轻音乐" v-model="songListmsg.tag_style">轻音乐' +
        '                    <input type="radio" name="style" value="R&B/Soul" v-model="songListmsg.tag_style">R&B/Soul' +
        '                </div>' +
        '<div class="choiceTagbtn"><span @click="showChoicetag=!showChoicetag">确定</span></div></div>' +
        '</div>' +
        //
        '<div class="listTitle"><router-link to="/UserMusic">我的音乐</router-link> > 编辑歌单信息</div>' +
        '<div class="eS-content">' +
        '<div class="eS-cover"><img :src="songListmsg.songmenu_cover">' +
        '<input type="file" @change="uploadCover($event)" name="cover">' +
        '</div>' +
        '<div class="eS-msg">' +
        '<div>' +
        '<form>' +
        '<div class="eS-msg-div"><div class="eS-lable">歌单名称：</div><input class="eS-listname" v-model="songListmsg.songmenu_name"></div>' +
        '<div class="eS-msg-div">歌单标签：{{songListmsg.tag_language}}&nbsp&nbsp&nbsp&nbsp{{songListmsg.tag_style}}<a class="choiceTag" @click="showChoicetag=!showChoicetag">选择标签</a></div>' +
        '<div class="eS-msg-div"><div class="eS-lable">歌单介绍：</div><textarea class="eS-listlable" v-model="songListmsg.songmenu_lable"></textarea></div>' +
        '<div @click="saveForm" class="saveBtn">保存</div>' +
        '</form>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>',
    methods: {
        uploadCover(event) {
            var file = event.target.files[0];//获取文件
            var formData = new FormData();//new一个formData事件
            formData.set("id", this.songListid);
            formData.set("cover", file); //将file属性添加到formData里
            axios({
                method: "POST",
                url: "UserUploadCover.php",
                header: {'Content-Type': "multipart/form-data"},
                data: formData
            }).then(function (response) {
                    if (response.data == false) {
                        alert("封面上传失败");
                    } else {
                        location.reload();
                    }
                }
            ).catch(function (error) {
                console.log(error);
            });
        },
        //加载歌单信息
        loadSonglistMsg() {
            axios
                .get('LoadListMessage.php', {
                    params: {songmenuid: this.songListid}
                })
                .then(response => (this.songListmsg = response.data))
                .catch(function (error) {
                    console.log(error)
                });
        },
        saveForm() {
            axios
                .get('UserEditSongList.php', {
                    params: {
                        id: this.songListid,
                        name: this.songListmsg.songmenu_name,
                        lable: this.songListmsg.songmenu_lable,
                        language: this.songListmsg.tag_language,
                        style: this.songListmsg.tag_style
                    }
                })
                .then(response => (this.saveReturn = response.data))
                .catch(function (error) {
                    console.log(error)
                })
        }
    },
    watch: {
        saveReturn() {
            if (this.saveReturn == "保存成功") {
                this.$router.push('/UserMusic');
            } else {
                alert(this.saveReturn);
            }
        }
    },
    mounted() {
        this.loadSonglistMsg();
    }
}

//用户主页
var UserPage = {
    props:["uprand"],
    data() {
        return {
            rand: this.$route.query.rand,
            upUserid: this.$route.query.userid,
            upUsermsg: '',
            createdList: '',
            collectedList: '',
            userBackground: {
                backgroundImage: ''
            },
            editshow: false,
            concernshow: false,
            cancelconcernshow: false,
            chatshow: false,
            concernResult: '',
            cancelResult: ''
        }
    },
    template: '<div class="userPage">' +
        '<div class="uP-userMsg" :style="userBackground">' +
        '<div class="uP-userAvatar"><img :src="upUsermsg[\'user_avatar\']"></div>' +
        '<div class="uP-userName">{{upUsermsg["user_name"]}}</div>' +
        '<div class="uP-someContent"><span>{{upUsermsg["user_gender"]}}</span><span>{{upUsermsg["user_birthday"]}}</span></div>' +
        '<div class="uP-userInteract uP-someContent"><span>动态{{upUsermsg["moments_count"]}}</span> | <span>关注{{upUsermsg["concern"]}}</span> | <span>粉丝{{upUsermsg["fans"]}}</span></div>' +
        '<div class="uP-userLable uP-someContent">个人描述：{{upUsermsg["user_lable"]}}</div>' +
        '<div class="uP-btn-div">' +
        '<div class="uP-btn" v-if="editshow" @click="gotoEditProfile">编辑</div>' +
        '<div class="uP-btn" v-if="concernshow" @click="concernUser">关注</div>' +
        '<div class="uP-btn" v-if="cancelconcernshow" @click="cancelConcern">取消关注</div>' +
        '<div class="uP-btn" v-if="chatshow">私信</div>' +
        '</div>' +
        '</div>' +
        '<div class="uP-userCreated">' +
        '<div class="listTitle">创建的歌单</div>' +
        '<div class="uP-createdList">' +
        '<div class="uP-list" v-for="site in createdList">' +
        '<div class="uP-cover" @click="gotoSonglistdetails(site[\'songmenu_id\'])"><img :src="site[\'songmenu_cover\']"></div><div class="uP-name">{{site["songmenu_name"]}}</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="uP-userCollect">' +
        '<div class="listTitle">收藏的歌单</div>' +
        '<div class="uP-collectList">' +
        '<div class="uP-list" v-for="site in collectedList">' +
        '<div class="uP-cover" @click="gotoSonglistdetails(site[\'songmenu_id\'])">' +
        '<img :src="site[\'songmenu_cover\']">' +
        '</div>' +
        '<div class="uP-name">{{site["songmenu_name"]}}</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>',
    methods: {
        gotoSonglistdetails(songListid) {
            this.$router.push({path: '/songListdetails', query: {songListid: songListid}});
        },
        gotoEditProfile() {
            this.$router.push("/editProfile");
        },
        loadUserinformation() {
            axios
                .get('LoadUserInformation.php', {
                    params: {userid: this.upUserid}
                })
                .then(response => (
                    this.upUsermsg = response.data, this.userBackground.backgroundImage = 'url("' + response.data.user_avatar + '")'
                ))
                .catch(function (error) {
                    console.log(error)
                })
        },
        loadUsercreated() {
            axios
                .get('LoadUserCreated.php', {
                    params: {userid: this.upUserid}
                })
                .then(response => (this.createdList = response.data))
                .catch(function (error) {
                    console.log(error)
                });
        },
        loadUsercollected() {
            axios
                .get('LoadUserCollected.php', {
                    params: {userid: this.upUserid}
                })
                .then(response => (this.collectedList = response.data))
                .catch(function (error) {
                    console.log(error)
                });
        },
        judgeUser() {
                if (this.upUserid == $.cookie("userid")) {
                    this.editshow = true;
                } else {
                    this.chatshow = true;
                    this.judgeConcern();
                }
        },
        judgeConcern() {
            axios
                .get('JudgeConcern.php', {
                    params: {userid: this.upUserid}
                })
                .then(response => (this.concernshow=!response.data,this.cancelconcernshow=response.data))
                .catch(function (error) {
                    console.log(error)
                });
        },
        concernUser() {
            axios
                .get('UserConcernOther.php', {
                    params: {otherid: this.upUserid}
                })
                .then(response => (this.concernResult=response.data))
                .catch(function (error) {
                    console.log(error)
                });
        },
        cancelConcern() {
            axios
                .get('UserCancelConcern.php', {
                    params: {otherid: this.upUserid}
                })
                .then(response => (this.cancelResult=response.data))
                .catch(function (error) {
                    console.log(error)
                });
        }
    },
    watch: {
        $route (to, from) {
            this.$router.go(0);
        },
        concernResult() {
            if (this.concernResult == "关注成功") {
                this.concernshow = false;
                this.cancelconcernshow = true;
            } else {
                alert(this.concernResult);
            }
        },
        cancelResult() {
            if (this.cancelResult == "取消成功") {
                this.concernshow = true;
                this.cancelconcernshow = false;
            } else {
                alert(this.concernResult);
            }
        }
    },
    mounted() {
        this.loadUserinformation();
        this.judgeUser();
        this.loadUsercreated();
        this.loadUsercollected();
    }
}

//歌单详情
var songListdetails = {
    data() {
        return {
            songListid: this.$route.query["songListid"],
            songListmsg: '',
            songListsong: '',
            songListlove: [], //喜欢这个歌单的人
            songListlike: [], //相似歌单
            showCollect: true,
            showLcover: false
        }
    },
    template: '<div class="songListdetails">' +
            '<div class="sL-songListcontent">' +
                '<div class="sL-songListmsg">' +
                    '<div class="sL-songListcover">' +
                    '<img :src="songListmsg[\'songmenu_cover\']"><div class="sL-overlay" @click="showLcover=true"><div class="lay-text">点击查看大图</div></div>' +
                    '</div>' +
                    '<div class="sL-lcover" v-if="showLcover"><img :src="songListmsg.songmenu_cover"><div class="sL-lcover-close" @click="showLcover=false">&times;</div></div>' +
                    '<div class="sL-songListtext">' +
                        '<div class="sL-songListname">{{songListmsg["songmenu_name"]}}</div>' +
                        '<div class="fontSize-13">创建人：{{songListmsg["user_name"]}}&nbsp&nbsp&nbsp创建时间：{{songListmsg["createdate"]}}</div>' +
                        '<div class="fontSize-13">标签：{{songListmsg["tag_language"]}} {{songListmsg["tag_style"]}}</div>' +
                        '<div class="sL-btn">' +
                            '<div @click="songlistPlay">播放</div>' +
                            '<div @click="songlistCollect" v-if="showCollect">收藏</div>' +
                            '<div @click="share">分享</div>' +
                        '</div>' +
                        '<div class="fontSize-13">介绍：{{songListmsg["songmenu_lable"]}}</div>' +
                    '</div>' +
                '</div>' +
            '<div class="sL-songListsong">' +
                '<div class="listTitle">歌曲列表</div>' +
                '<table class="songTable">' +
                    '<tr>' +
                    '<th>id</th><th>歌曲</th><th>时长</th><th>歌手</th><th></th><th></th></tr>' +
                    '<tr v-for="(site,index) in songListsong">' +
                        '<td class="songId">{{++index}}</td>' +
                        '<td class="songName"><a @click="gotoSongdetails(site.song_id)">{{site["song_name"]}}</a></td>' +
                        '<td class="songDuration">{{site["song_duration"]}}</td>' +
                        '<td class="songSinger"><a>{{site["song_singer"]}}</a></td>' +
                        '<td class="songPlay" @click="musicPlay(site.song_id)"><a>播放</a></td>' +
                        '<td class="songCollect" @click="musicCollect(site.song_id)"><a>收藏</a></td>' +
                    '</tr>' +
                '</table>' +
            '</div>' +
        '</div>' +
        '<div class="sL-aside">' +
        '<div class="sL-aside-user">' +
        '<div class="listTitle">喜欢这个歌单的人</div>' +
        '<div class="sL-aside-user-list">' +
            '<div class="sL-aside-avatar" v-for="site in songListlove" @click="gotoUserpage(site.user_id)"><img :src="site.user_avatar"></div>' +
        '</div>' +
        '<div class="sL-aside-songList">' +
        '<div class="listTitle">相似歌单</div>' +
        '<div class="sL-aside-songlist-list" v-for="site in songListlike" @click="songListid=site.songmenu_id">' +
        '<div class="sL-aside-cover"><img  :src="site.songmenu_cover"></div>' +
        '<div class="sL-aside-listContent"><div>{{site.songmenu_name}}</div><div>by{{site.user_name}}</div></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>',
    methods: {
        //加载歌单信息
        loadSonglistMsg() {
            axios
                .get('LoadSongListInformation.php', {
                    params: {songmenuid: this.songListid}
                })
                .then(response => (this.songListmsg = response.data))
                .catch(function (error) {
                    console.log(error)
                });
        },
        //加载歌单歌曲
        loadSonglistsong() {
            axios
                .get('LoadSongListCollected.php', {
                    params: {songmenuid: this.songListid}
                })
                .then(response => (this.songListsong = response.data))
                .catch(function (error) {
                    console.log(error)
                });
        },
        //加载喜欢歌单的人
        loadSonglistlove() {
            axios
                .get('RecommendLikeSongListUser.php', {
                    params: {songmenuid: this.songListid}
                })
                .then(response => (this.songListlove=response.data))
                .catch(function (error) {
                    console.log(error)
                });
        },
        //加载相似歌单
        loadSonglistlike() {
            axios
                .get('RecommendSimilarSongList.php', {
                    params: {songmenuid: this.songListid}
                })
                .then(response => (this.songListlike=response.data))
                .catch(function (error) {
                    console.log(error)
                });
        },
        songlistCollect() {
            axios
                .get('UserCollectSongList.php', {
                    params: {songmenuid: this.songListid}
                })
                .then(response => (alert(response.data)))
                .catch(function (error) {
                    console.log(error)
                });
        },
        gotoSonglistdetails(songListid) {
            this.$router.push({path: '/songListdetails', query: {songListid: songListid}})
        },
        gotoSongdetails(id) {
            this.$router.push({path: '/songDetails', query: {id: id}})
        },
        musicPlay(songid) {
            console.log(songid);
            this.$emit('musicplay', {data: songid});
        },
        songlistPlay() {
            this.$emit('songlistplay', {data: this.songListsong});
        },
        musicCollect(songid) {
            this.$emit('musiccollect', {data: songid});
        },
        share() {
            let num = Math.random();
            this.$emit('share', {data: num, songlist: this.songListmsg, song:''});
        },
        gotoUserpage(id) {
            this.$router.push({path: '/UserPage',query: {userid:id}})
        }
    },
    watch: {
        songListmsg() {
            if (this.songListmsg.songmenu_user == $.cookie("userid")) {
                this.showCollect = false;
            }
        },
        songListid() {
            this.gotoSonglistdetails(this.songListid);
            this.loadSonglistMsg();
            this.loadSonglistsong();
            this.loadSonglistlove();
            this.loadSonglistlike();
        }
    },
    mounted() {
        this.loadSonglistMsg();
        this.loadSonglistsong();
        this.loadSonglistlove();
        this.loadSonglistlike();
    }
};
//歌曲详情
var songDetails = {
    data() {
        return {
            songDetailsId: this.$route.query.id,
            songDetails: '',
            commentList: '', //评论列表
            commentShow: false, //是否有评论
            songForuser: '', //喜欢这首歌的人
            songForlist: '', //包含该歌曲的歌单
            showCommentdiv: false,
            commentContent: '',
            likecount: 0
        }
    },
    template: '<div class="songDetails">' +
        '<div class="background" v-if="showCommentdiv">' +
        '<div class="commentDiv">' +
        '<div class="listTitle">发表评论</div>' +
        '<div class="commentInput"><textarea v-model="commentContent"></textarea></div>' +
        '<div class="sendComment"><span @click="showCommentdiv=false">取消</span><span @click="sendComment">发表</span></div>' +
        '</div>' +
        '</div>' +
        '<div class="sD-songMsg">' +
        '<div class="sD-songContent">' +
        '<div class="sD-songName">{{songDetails.song_name}}</div>' +
        '<div class="sD-songSinger">{{songDetails.song_singer}}</div>' +
        '<div class="sD-btn">' +
        '<div @click="musicPlay(songDetails.song_id)">播放</div>' +
        '<div @click="musicCollect(songDetails.song_id)">收藏</div>' +
        '<div @click="share">分享</div><div @click="showCommentdiv=true">评论</div></div>' +
        '<div class="sD-songLyric">当前歌曲暂未上传歌词</div>' +
        '</div>' +
        '<div class="sD-songComment">' +
        '<div class="listTitle">评论<u @click="showCommentdiv=true">发表评论</u></div>' +
        '<div class="noComment" v-if="!commentShow">当前歌曲暂无评论</div>' +
        '<div class="commentList" v-if="commentShow" v-for="site in commentList">' +
        '<div class="commentAvatar" @click="gotoUserpage(site.user_id)"><img :src="site.user_avatar"></div>' +
        '<div class="commentMsg">' +
        '<div class="commentName" @click="gotoUserpage(site.user_id)">{{site.user_name}}</div>' +
        '<div class="commentContent">{{site.comment_content}}</div>' +
        '<div class="commentFoot"><div class="commentTime">{{site.comment_time}}</div><div><div class="likeThis" @click="likecount++">喜欢({{likecount}})</div><div class="replayThis">回复</div></div></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="sD-recommend">' +
        '<div class="listTitle">喜欢这首歌的人</div>' +
        '<div class="sD-aside-user-list">' +
        '<div class="sD-aside-avatar" v-for="site in songForuser" @click="gotoUserpage(site.user_id)"><img :src="site.user_avatar"></div>' +
        '</div>' +
        '<div class="listTitle">收藏该歌曲的歌单</div>' +
        '<div class="sD-forList">' +
        '<div class="sD-recommend-list" v-for="site in songForlist" @click="gotoSonglistdetails(site.songmenu_id)">' +
        '<div class="sD-recommend-cover"><img  :src="site.songmenu_cover"></div>' +
        '<div class="sL-recommend-content"><div>{{site.songmenu_name}}</div><div>by{{site.user_name}}</div></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>',
    methods: {
        //加载评论
        loadComment(id) {
            axios
                .get('LoadSongComment.php', {
                    params: {songid: id}
                })
                .then(response => (this.commentList = response.data))
                .catch(function (error) {
                    console.log(error);
                })
        },
        //加载歌曲详情
        loadSongdetails(id) {
            axios
                .get('PlayContent.php', {
                    params: {songid: id}
                })
                .then(response => (this.songDetails = response.data))
                .catch(function (error) {
                    console.log(error)
                });
        },
        //加载喜欢这首歌的人
        loadSonglove() {
            axios
                .get('RecommendLikeSongUser.php', {
                    params: {songid: this.songDetailsId}
                })
                .then(response => (this.songForuser = response.data))
                .catch(function (error) {
                    console.log(error);
                });
        },
        //加载收藏这首歌的歌单
        forSonglist() {
            axios
                .get('RecommendCollectSongSongList.php', {
                    params: {songid: this.songDetailsId}
                })
                .then(response => (this.songForlist = response.data))
                .catch(function (error) {
                    console.log(error);
                });
        },
        musicPlay(songid) {
            this.$emit('musicplay', {data: songid});
        },
        musicCollect(songid) {
            this.$emit('musiccollect', {data: songid});
        },
        share() {
            let num = Math.random();
            this.$emit('share', {data: num, song: this.songDetails, songlist:''});
        },
        sendComment() {
            axios
                .get('UserSendComment.php', {
                    params: {songid: this.songDetailsId,content:this.commentContent}
                })
                .then(response => (alert(response.data),this.showCommentdiv=false,this.commentContent='',this.loadComment(this.songDetailsId)))
                .catch(function (error) {
                    console.log(error);
                });
        },
        gotoSonglistdetails(songListid) {
            this.$router.push({path: '/songListdetails', query: {songListid: songListid}})
        },
        gotoUserpage(id) {
            this.$router.push({path: '/UserPage',query: {userid:id}})
        }
    },
    watch: {
        commentList() {
            if (this.commentList != "") {
                this.commentShow = true;
            }
        }
    },
    mounted() {
        this.loadComment(this.songDetailsId);
        this.loadSongdetails(this.songDetailsId);
        this.forSonglist();
        this.loadSonglove();
    }
};

//编辑个人资料
var editProfile = {
    data() {
        return {
            year: [],
            month: [],
            date: [],
            leapYear: [],
            leapMonth: [1, 3, 5, 7, 8, 10, 12],
            userName: '',
            userAvatar: '',
            userLable: '',
            userGender: '',
            userBirthday: '',
            BirthdayY: '',
            BirthdayM: '',
            BirthdayD: ''
        }
    },
    template: '<div class=editProfile>' +
        '<div class="listTitle"><router-link to="/UserPage">个人主页</router-link> > 编辑个人资料</div>' +
        '<div class="eP-content">' +
        '<div class="eP-avatar"><img :src="userAvatar">' +
        '<input type="file" @change="uploadAvatar($event)" name="avatar">' +
        '</div>' +
        '<div class="eP-msg">' +
        '<div>' +
        '<form>' +
        '<div class="eP-msg-div"><div class="eP-lable">用户名：</div><input class="eP-username" v-model="userName"></div>' +
        '<div class="eP-msg-div"><div class="eP-lable">介绍：</div><textarea class="eP-userlable" v-model="userLable"></textarea></div>' +
        '<div class="eP-msg-div">' +
        '<div class="eP-lable">性别：</div>' +
        '男<input class="eP-usergender" type="radio" name="usergender" value="男" v-model="userGender">' +
        '女<input class="eP-usergender" type="radio" name="usergender" value="女" v-model="userGender">' +
        '保密<input class="eP-usergender" type="radio" name="usergender" value="保密" v-model="userGender">' +
        '</div>' +
        '<div class="eP-msg-div">' +
        '<div class="eP-lable">生日：</div>' +
        '<select  rel="2019" v-model="BirthdayY">' +
        '<option v-for="site in year">{{site}}</option>' +
        '</select> 年' +
        '<select  rel="1" v-model="BirthdayM">' +
        '<option v-for="site in month">{{site}}</option>' +
        '</select> 月' +
        '<select  rel="1" v-model="BirthdayD">' +
        '<option v-for="site in date">{{site}}</option>' +
        '</select> 日' +
        '</div>' +
        '<div @click="saveForm" class="saveBtn">保存</div>' +
        '</form>' +
        '</div>' +
        '</div>' +
        '</div>',
    computed: {
        birthday() {
            this.BirthdayY = parseInt(this.userBirthday[0]);
            this.BirthdayM = parseInt(this.userBirthday[1]);
            this.BirthdayD = parseInt(this.userBirthday[2]);
        },
        loadYear() {
            for (var i = 1990; i < 2020; i++) {
                this.year.push(i);
                if (i % 100 == 0) {
                    if (i % 400 == 0) {
                        this.leapYear.push(i);
                    }
                } else {
                    if (i % 4 == 0) {
                        this.leapYear.push(i);
                    }
                }
            }
        },
        loadMonth() {
            for (var i = 1; i <= 12; i++) {
                this.month.push(i);
            }
        }
    },
    methods: {
        loadUser() {
            axios
                .get('LoadUserInformation.php',{params: {userid: $.cookie('userid')}})
                .then(response => (
                    this.userName = response.data.user_name,
                        this.userLable = response.data.user_lable,
                        this.userGender = response.data.user_gender,
                        this.userAvatar = response.data.user_avatar,
                        response.data.user_birthday!=null?this.userBirthday = response.data.user_birthday.split("-"):this.userBirthday="2019-01-01".split("-"),
                        this.birthday
                ))
                .catch(function (error) {
                    console.log(error)
                })
        },
        saveForm() {
            axios
                .get('UserEditProfile.php', {
                    params: {
                        username: this.userName,
                        userlable: this.userLable,
                        usergender: this.userGender,
                        userbirthday: this.BirthdayY + "-" + this.BirthdayM + "-" + this.BirthdayD
                    }
                })
                .then(response => (alert(response.data)))
                .catch(function (error) {
                    console.log(error)
                })
        },
        uploadAvatar(event) {
            var file = event.target.files[0];//获取文件
            var formData = new FormData();//new一个formData事件
            formData.set("avatar", file); //将file属性添加到formData里
            axios({
                method: "POST",
                url: "UserUploadAvatar.php",
                header: {'Content-Type': "multipart/form-data"},
                data: formData
            }).then(function (response) {
                    if (response.data == false) {
                        alert("头像上传失败");
                    } else {
                        location.reload();
                    }
                }
            ).catch(function (error) {
                console.log(error);
            });
        }
    },
    watch: {
        BirthdayM() {
            this.date = [];
            if (this.leapMonth.indexOf(parseInt(this.BirthdayM)) != -1) {
                for (var i = 1; i <= 31; i++) {
                    this.date.push(i);
                }
            } else {
                if (this.BirthdayM == 2) {
                    if (this.leapYear.indexOf(parseInt(this.BirthdayY)) != -1) {
                        for (var i = 1; i <= 29; i++) {
                            this.date.push(i);
                        }
                    } else {
                        for (var i = 1; i <= 28; i++) {
                            this.date.push(i);
                        }
                    }
                } else {
                    for (var i = 1; i <= 30; i++) {
                        this.date.push(i);
                    }
                }
            }
        },
        BirthdayY() {
            if (this.leapYear.indexOf(parseInt(this.BirthdayY)) != -1) {
                if (this.leapMonth.indexOf(parseInt(this.BirthdayM)) != -1) {
                    this.date = [];
                    for (var i = 1; i <= 29; i++) {
                        this.date.push(i);
                    }
                }
            }
        }
    },
    mounted() {
        this.loadUser();
        this.loadYear;
        this.loadMonth;
    }
}

//搜索模块
var searchResult = {
    props:['searchcontent'],
    data() {
        return {
            searchTxt: '',
            searchCategory: 'song',
            searchCount: '',
            song: '',
            songlist: '',
            user: '',
            defaultStyle: {"background":"#f9f9f9","border-bottom":"1px slategray solid"},
            songshow: true,
            listshow: false,
            usershow: false
        }
    },
    template: '<div class="searchResult">' +
        '<div class="sR-input"><input v-model="searchTxt"><div @click="doSearch">搜索</div></div>' +
        '<div style="font-size: 13px;color: #8a8a8a">共有{{searchCount}}条结果</div>' +
        '<div class="sR-category">' +
        '<div class="sRc-div" @click="searchSong(),cStyle($event)" :style="defaultStyle">歌曲</div>' +
        '<div class="sRc-div" @click="searchSonglist(),cStyle($event)" >歌单</div>' +
        '<div class="sRc-div" @click="searchUser(),cStyle($event)">用户</div></div>' +
        '<div class="sR-result">' +
        //搜索歌曲
        '<table class="songTable" v-show="songshow">' +
        '<tr>' +
        '<th>id</th><th>歌曲</th><th>时长</th><th>歌手</th><th></th><th></th>' +
        '</tr>' +
        '<tr v-for="(site,index) in song">' +
        '<td class="songId">{{++index}}</td>' +
        '<td class="songName"><a @click="gotoSongdetails(site.song_id)">{{site["song_name"]}}</router-link></td>' +
        '<td class="songDuration">{{site["song_duration"]}}</td>' +
        '<td class="songSinger"><a>{{site["song_singer"]}}</a></td>' +
        '<td class="songPlay"><a @click="musicPlay(site[\'song_id\'])">播放</a></td>' +
        '<td class="songCollect"><a @click="musicCollect(site[\'song_id\'])">收藏</a></td>' +
        '</tr>' +
        '</table>' +
        //搜索歌单
        '<table class="songTable sR-listtable" v-show="listshow">' +
        '<tr>' +
        '<th class="sR-th-a">id</th><th class="sR-th-b">歌单封面</th><th>歌单名称</th><th class="sR-th-b"></th><th>创建人</th><th class="sR-th-a"></th><th class="sR-th-a"></th>' +
        '</tr>' +
        '<tr v-for="(site,index) in songlist">' +
        '<td>{{++index}}</td>' +
        '<td><div class="sR-cover"><img :src="site.songmenu_cover"></div></td>' +
        '<td>{{site.songmenu_name}}</td>' +
        '<td><a>{{site.song_count}} 首</a></td>' +
        '<td><a>by  {{site.user_name}}</a></td>' +
        '<td><a>播放</a></td>' +
        '<td><a>收藏</a></td>' +
        '</tr>' +
        '</table>' +
        //搜索用户
        '<div class="sR-user" v-show="usershow">' +
        '<div class="sR-userlist" v-for="site in user">' +
        '<div class="sR-avatar"><img :src="site.user_avatar"></div>' +
        '<div class="sR-username">{{site.user_name}}<span>{{site.user_gender}}</span></div>' +
        '<div class="sR-userlable">{{site.user_lable}}</div>' +
        '<div class="sR-sdiv sR-songmenu">歌单： {{site.songmenu_count}}</div>' +
        '<div class="sR-sdiv sR-fans">粉丝： {{site.user_fans}}</div>' +
        '<div class="sR-sdiv sR-concern">关注</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>',
    mounted() {
        this.searchTxt = this.searchcontent;
        this.doSearch();
    },
    watch: {
        searchcontent() {
            this.searchTxt = this.searchcontent;
        }
    },
    methods: {
        cStyle($event) {
            $('.sRc-div').css({"background":"none","border-bottom":"none"});
            $(event.target).css({"background":"#f9f9f9","border-bottom":"1px slategray solid"});
        },
        searchSong() {
            this.songshow = true;
            this.listshow = false;
            this.usershow = false;
            this.searchCategory='song';
            this.doSearch();
        },
        searchSonglist() {
            this.songshow = false;
            this.listshow = true;
            this.usershow = false;
            this.searchCategory='songlist';
            this.doSearch();
        },
        searchUser() {
            this.songshow = false;
            this.listshow = false;
            this.usershow = true;
            this.searchCategory='user';
            this.doSearch();
        },
        doSearch() {
            if (this.searchTxt!='') {
                if (this.searchCategory=='song') {
                    this.laodSearchsong();
                }
                if (this.searchCategory=='songlist') {
                    this.laodSearchsonglist();
                }
                if (this.searchCategory=='user') {
                    this.laodSearchuser();
                }
            }
        },
        laodSearchsong() {
            if (this.searchTxt!='') {
                axios
                    .get('SearchSong.php', {
                        params: {content: this.searchTxt}
                    })
                    .then(response => (this.song = response.data,this.searchCount=this.song.length))
                    .catch(function (error) {
                        console.log(error);
                    })
            }
        },
        laodSearchsonglist() {
            if (this.searchTxt!='') {
                axios
                    .get('SearchSongList.php', {
                        params: {content: this.searchTxt}
                    })
                    .then(response => (this.songlist = response.data,this.searchCount=this.songlist.length))
                    .catch(function (error) {
                        // 请求失败处理
                        console.log(error);
                    })
            }
        },
        laodSearchuser() {
            if (this.searchTxt!='') {
                axios
                    .get('SearchUser.php', {
                        params: {username : this.searchTxt}
                    })
                    .then(response => (this.user = response.data,this.searchCount=this.user.length))
                    .catch(function (error) {
                        // 请求失败处理
                        console.log(error);
                    });
            }
        },
        gotoSongdetails(){},
        musicPlay(songid) {
            this.$emit('musicplay', {data: songid});
        },
        musicCollect(songid) {
            this.$emit('musiccollect', {data: songid});
        }
    }
}
