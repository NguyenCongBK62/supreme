import React, { useState } from 'react'
import { Divider, Menu, MenuItem } from '@mui/material'
import logo from '../../../assets/images/logo.png'
import './style.scss'
import { useNavigate } from 'react-router-dom'

export interface MenuPosition {
  anchorEl: Element | null
  popno: number | string
}

type MenuButtonProps = {
  className: string
  onClick?: React.MouseEventHandler
  children: any
}

const MenuButton = ({ className, onClick, children }: MenuButtonProps) => {
  return (
    <div className="outside">
      <button className={`inside ${className || ''}`} onClick={onClick}>
        {children}
      </button>
    </div>
  )
}

const Header = () => {
  const navigate = useNavigate()
  const [popupMenu, setpopupMenu] = useState(false)

  const [menuPosition, setMenuPosition] = useState<MenuPosition>({
    anchorEl: null,
    popno: -1,
  })

  const handleClick = (e: React.MouseEvent, _popno: number) => {
    e.currentTarget.classList.add('active')
    setMenuPosition({ anchorEl: e.currentTarget, popno: _popno })
  }

  const handleClose = () => {
    menuPosition.anchorEl?.classList.remove('active')
    setMenuPosition({ anchorEl: null, popno: -1 })
  }
  return (
    <div className="header">
      <div className="header__top">
        <img src={logo} alt="logo" className="logo" height={50} />
        <div className="header__top__button">
          <button className="btn">ブロック一覧</button>
          <button className="btn">ガバナ一覧</button>
        </div>
        <div className="header__top__button">
          <button
            className="btn"
            onClick={() => {
              setpopupMenu(!popupMenu)
            }}
          >
            凡例
          </button>
          <button className="btn">稼働履歴</button>
        </div>
      </div>
      <div className="header__menu">
        <div className="menu">
          <MenuButton className="btn menu__btn btn-big" onClick={(e) => handleClick(e, 1)}>
            <span>1</span>
            TOP ページ
          </MenuButton>
          {menuPosition.popno === 1 && (
            <Menu
              className="sub__menu"
              open={Boolean(menuPosition.anchorEl)}
              onClose={handleClose}
              anchorEl={menuPosition.anchorEl}
            >
              <MenuItem> Menu 1</MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  navigate('/page/topPage')
                  handleClose()
                }}
              >
                {' '}
                閉巡回リスト確認
              </MenuItem>
              <Divider />
            </Menu>
          )}
        </div>
        <div className="menu">
          <MenuButton className="btn menu__btn btn-big" onClick={(e) => handleClick(e, 2)}>
            <span>2</span>
            低圧 第 1 次 緊急停止判断操作
          </MenuButton>
          {menuPosition.popno === 2 && (
            <Menu
              className="sub__menu"
              open={Boolean(menuPosition.anchorEl)}
              onClose={handleClose}
              anchorEl={menuPosition.anchorEl}
            >
              <MenuItem>2-1. 第 1 次緊急停止判断 L ブロック操作</MenuItem>
              <Divider />
              <MenuItem>2-2. 閉巡回リスト確認 (第 1 次)</MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  navigate('/ShutoffBlock')
                  handleClose()
                }}
              >
                2-3. 第 2 次緊急停止判断 L ブロック操作
              </MenuItem>
              <Divider />
              <MenuItem>2-4. 閉巡回リスト確認 (第 2 次)</MenuItem>
              <Divider />
            </Menu>
          )}
        </div>
        <div className="menu">
          <MenuButton className="btn menu__btn btn-big" onClick={(e) => handleClick(e, 3)}>
            <span>3</span>
            中圧 K ブロック化 中圧供給停止対応
          </MenuButton>
          {menuPosition.popno === 3 && (
            <Menu
              className="sub__menu"
              open={Boolean(menuPosition.anchorEl)}
              onClose={handleClose}
              anchorEl={menuPosition.anchorEl}
            >
              <MenuItem>中圧緊急措置判定</MenuItem>
              <Divider />
              <MenuItem>中圧圧力降下グラフ</MenuItem>
              <Divider />
              <MenuItem>中圧被害推定</MenuItem>
              <Divider />
              <MenuItem>中圧停止に伴う低圧ブロック停止操作</MenuItem>
              <Divider />
              <MenuItem>閉巡回リスト確認 (全て)</MenuItem>
              <Divider />
            </Menu>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
