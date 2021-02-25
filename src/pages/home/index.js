import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import Header from '@common/header';
import WordTab from './component/wordTab'
import {actionCreators} from './store';
import style from '@pages/home/home.module.less'


class Home extends PureComponent {
    componentDidMount() {
        this.props.getBloggerInfo();
    }
     getProject=(text,projectInfo)=>{
        return(
            <div className={style.projectDiv}>
                <span>{text}</span>
                {
                    projectInfo&&projectInfo.map(item=>(
                        <div key={item.id} className={style.projectItem}>
                            <img src={item.icon} alt=''/>
                            <p>{item.name}</p>
                        </div>
                    ))
                }
            </div>
        )
    };

    render() {
        const {bloggerInfo} = this.props;
        const {url, name, gender, numInfo,corpus,
            createProject,managementProject
        } = bloggerInfo.toJS();

        return (
            <>
                <Header></Header>
                <div className={style.homeContent}>
                    <div className={style.contentLeft}>
                        <div className={style.leftUserInfo}>
                            <img src={url} alt="" className={style.userInfoUrl}/>
                            <div className={style.userInfoContext}>
                                <div className={style.userName}>
                                    <span>{name}</span>
                                    <i className={gender ? 'iconnan iconfont' : 'iconnv iconfont'}></i>
                                </div>
                                {
                                    numInfo && (
                                      <div className={style.numInfoDiv}>
                                          {
                                              numInfo.map(item => (
                                                  <div className={style.numInfoDivItm}>
                                                      <span>{item.text}</span>
                                                      <span>{item.num}
                                                          {
                                                              item.canClick&&<i> ></i>
                                                          }
                                                      </span>
                                                  </div>
                                              ))
                                          }
                                      </div>
                                    )

                                }
                            </div>
                            <div className={style.userInfoBtn}>
                                <span className={style.btnSend}>发简信</span>
                                <span className={style.btnAdd}>+关注</span>
                            </div>
                        </div>
                        <WordTab></WordTab>

                    </div>
                    <div className={style.contentRight}>
                        {
                            this.getProject("他创建的专题",createProject)
                        }
                        {
                            this.getProject('他管理的专题',managementProject)
                        }
                        <div className={style.corpusDiv}>
                            <span>他的文集</span>
                            {
                                corpus&&corpus.map(item=>(
                                    <div className={style.corpusItem}>
                                        <i className='iconfont iconsvgwrite'></i>
                                        <p>{item.name}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        bloggerInfo: state.getIn(['home', 'bloggerInfo'])
    }
};
const mapDispatchToProps = (dispath) => {
    return {
        getBloggerInfo() {
            dispath(actionCreators.getBloggerInfo())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
