import React, { useEffect  } from 'react';

import { Layout } from './components/Layout';
import { Home } from './components/home/Home';
import { Content } from './components/content/Content';
import { Notice } from './components/notice/Notice';
import { PageNotFound } from './components/shared/PageNotFound';
import ReactGA from 'react-ga';

import './custom.css'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation 
} from 'react-router-dom'

//ReactGA.initialize('UA-60440167-3');
//ReactGA.pageview(window.location.pathname + window.location.search)

//const history = createBrowserHistory();
//history.listen(location => {
//    ReactGA.set({ page: location.pathname });
//    ReactGA.pageview(location.pathname);
//});

export default function  App()  {

  const { pathname, hash } = useLocation()

  useEffect(() => {
    // if not a hash link scroll to top
    if (hash === '') {
        window.scrollTo(0, 0)
    }
    // else scroll to id
    else {
        setTimeout(
            () => {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                var headerOffset = 180;
                if (element) {
                    //element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    var elementPosition = element.getBoundingClientRect().top;
                    var offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            },
            1000
        );
    }
}, [pathname]) // do this on route change

  return (
    <Router>
      <Layout path={pathname}>
          <Switch>        
              <Route path="/notice/:url" exact component={Notice}  />
              <Route path="/:url/:mode/:itemurl" exact component={Content} />
              <Route path="/:url" exact component={Content} />
              <Route path="/" exact component={Home}/>
              <Route component={PageNotFound} />
          </Switch>
      </Layout>
    </Router>
  );
}