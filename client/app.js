import React, {useState} from 'react'
// import Menu from './components/Menu'
import Berpi from './components/images/Berpi.mp4'
import {Menu} from 'semantic-ui-react'
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

import Camera from './components/Camera'
import Skelet from "./components/Skelet";
import VideoOnMain from "./components/VideoOnMain";
import Fitness from "./components/Fitnes";
import MyTry from "./components/myTry";





const App = () => {
    const [activeItem, useActiveItem] = useState({activeItem: 'Fitness'});
    const [videopr, setVideopr] = useState({src: 'Fitness'});
    const handleItemClick = (e, { name }) => useActiveItem({ activeItem: name });
  const onHor = (e, str) => {
      setVideopr({src: str})
  };
  return (
      <div style={{height: '100%'}} className={'allPage'}>
          <div className={'LeftMenu'}>
              <Menu vertical inverted fluid color={'teal'} style={{height: '100%', display: 'flex', justifyContent: 'space-between'}}>
                  <Menu.Item
                      onMouseEnter={(e) => {
                          onHor(e, 'Fitness');
                      }
                      }
                      active={activeItem === 'Fitness'}
                      onClick={handleItemClick}
                      style={{height: '20%', width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', fontFamily: 'HelveticaBold', fontSize: '4vh'}}>
                      <Link to={'/fitnes'}>Фитнес</Link>
                  </Menu.Item>

                  <Menu.Item
                      onMouseEnter={(e) => {
                          onHor(e, 'Box')}
                      }

                      active={activeItem === 'Box'}
                      onClick={handleItemClick}
                      style={{height: '20%', width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', fontFamily: 'HelveticaBold', fontSize: '4vh'}}
                  ><Link to={'/box'}>Бокс</Link></Menu.Item>
                  <Menu.Item
                      onMouseEnter={(e) => {
                          onHor(e, 'Tennis')}
                      }
                      active={activeItem === 'Tennis'}
                      onClick={handleItemClick}
                      style={{height: '20%', width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', fontFamily: 'HelveticaBold', fontSize: '4vh'}}
                  ><Link to={'/tennis'}>Теннис</Link>
                  </Menu.Item>
                  <Menu.Item
                      onMouseEnter={(e) => {
                          onHor(e, 'Dance')}
                      }
                      active={activeItem === 'Dance'}
                      onClick={handleItemClick}
                      style={{height: '20%', width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', fontFamily: 'HelveticaBold', fontSize: '4vh'}}
                  ><Link to={'/dance'}>Танцы</Link>
                  </Menu.Item>
                  <Menu.Item
                      onMouseEnter={(e) => {
                          onHor(e, 'Volleyball')}
                      }
                      active={activeItem === 'Volleyball'}
                      onClick={handleItemClick}
                      style={{height: '20%', width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', fontFamily: 'HelveticaBold', fontSize: '4vh'}}
                  ><Link to={'/volleyball'}>Волейбол</Link></Menu.Item>
              </Menu>
          </div>
          <div className={'RightAllItem'}>
              <Router>
                  <div style={{height: '100%', width: '100%'}}>
                      <Switch>
                          <Route exact path={'/'} component={VideoOnMain}/>
              {/*<Route exact path={'/'} component={() => {*/}
              {/*    return(*/}
              {/*        <VideoOnMain style={{height: '100%', width: '100%', zIndex: '0', position: 'absolute'}} src={videopr.src}/>*/}
              {/*    )*/}
              {/*}} />*/}
              <Route exact path={'/fitnes'} component={() => {
                  return(<Fitness/>)
              }}/>
              {/*<Route exact path={'/prised'} component={Camera}/>*/}
              <Route exact path={'/prised'} component={MyTry}/>
              <Route exact path={'/prised/camera'} component={Camera}/>
                      </Switch>
                      </div>
                  </Router>
          </div>
      </div>
  )
}

export default App
