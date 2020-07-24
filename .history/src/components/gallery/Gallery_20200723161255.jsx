import React, {Component} from 'react'
import Lightbox, { Modal, ModalGateway } from 'react-images'
import {
  LoadingOutlined,
  FilePdfOutlined,
  CloseOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons'
import utils from '../../../../project/dtchain-fe/src/utils/index'
import './style/gallery.less'

export default class Gallery extends Component{
  constructor(props) {
    super(props)
    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
    }
    this.openLightbox = this.openLightbox.bind(this)
    this.closeLightbox = this.closeLightbox.bind(this)
    this.gotoPrevious = this.gotoPrevious.bind(this)
    this.gotoNext = this.gotoNext.bind(this)
    this.gotoImage = this.gotoImage.bind(this)
  }
  openLightbox (index, e) {
    const { images } = this.props
    e.preventDefault()
    //1. 判断当前图片索引之前有多少份pdf文件,n
    //2. currentimage = index - n
    const newArr = images.slice(0, index + 1)
    const pdfArr = newArr.filter(item => /.pdf$/.test(item.source.split('?')[0]))
    this.setState({
      currentImage: index - pdfArr.length,
      lightboxIsOpen: true,
    })
  }
  closeLightbox () {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    })
  }
  gotoPrevious () {
    this.setState({
      currentImage: this.state.currentImage - 1,
    })
  }
  gotoNext () {
    this.setState({
      currentImage: this.state.currentImage + 1,
    })
  }
  gotoImage (index) {
    this.setState({
      currentImage: index,
    })
  }
  isPdf = (source) => {
    if(source.indexOf("?") !== -1) {
      return /.pdf$/.test(source.split('?')[0])
    }
    return false
  }

  getStyleConfig = () => {
    const { size='normal' } = this.props
    switch (size) {
      case 'normal':
        return { 
          galleryItem: 'gallery-nm-item' 
        }
      case 'small':
        return {
          galleryItem: 'gallery-sm-item'
        }
      default:
        break
    }
  }

  toggleVisible = (e, i, visible) => {
    e.stopPropagation()
    this.props.handleVisibleChange(i, visible)
  }

  renderVisibleEye = (obj, i) => {
    return obj.visible ? 
      <EyeOutlined className='gallery-item-eye' onClick={e => this.toggleVisible(e, i, obj.visible)}/> : 
        <EyeInvisibleOutlined className='gallery-item-eye' type="eye-invisible" onClick={e => this.toggleVisible(e, i, obj.visible)}/>
  }

  render() {
    const {lightboxIsOpen} = this.state
    const {images, deletable, deleteCallback, visible} = this.props
    const styles = this.getStyleConfig()
    return (
      <div className="gallery">
        <div className="gallery-list">
          {
            images.map((obj, i) => {
              return (
                <div key={i} className={styles.galleryItem}>
                  {
                    !this.isPdf(obj.source) ? (
                    <div className='gallery-item-box' onClick={(e) => this.openLightbox(i, e)}>
                      <a href={obj.source} >
                        <img src={obj.source} alt={i}/>
                      </a>
                      { visible && this.renderVisibleEye(obj, i) }
                    </div>
                    ) : <div className='gallery-item-box' onClick={() => /^http/.test(obj.source) ? window.open(obj.source) : utils.Message('warning', '预览出错')}>
                      <span className="link">
                        {
                          obj.loading
                            ? <LoadingOutlined />
                            : <FilePdfOutlined theme="twoTone" style={{fontSize: '40px'}}/>
                        }
                      </span>
                      { visible && this.renderVisibleEye(obj, i) }
                    </div>
                  }
                  <div className="gallery-text">{obj.text}</div>
                  {deletable && <CloseOutlined className="gallery-item-delete" onClick={(e) => deleteCallback(e, i)}/> }
                </div>
              )
            })
          }
        </div>
        <ModalGateway>
          {
            lightboxIsOpen ? 
            <Modal onClose={this.closeLightbox}>
              <Lightbox
                key={-1}
                currentIndex={this.state.currentImage}
                views={images.filter(item => {
                  return !this.isPdf(item.source)
                })}
                onClickNext={this.gotoNext}
                onClickPrev={this.gotoPrevious}
              />
            </Modal> : null
          }
        </ModalGateway>
        
      </div>
    )
  }
}
