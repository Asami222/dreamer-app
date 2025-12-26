import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Link from "next/link";
import AppLogo from "src/components/atoms/AppLogo";
import { ChecklistIcon, AccountCircleIcon, CreateIcon, NoAccountsIcon, EmojiEventsIcon, LogoutIcon, PersonIcon, StarIcon, SettingsIcon } from "src/components/atoms/IconButton";
import ShapeImage from "src/components/atoms/ShapeImage";
import { Profile } from "@/types/data"
import clsx from "clsx"

interface HeaderUIProps {
  profile: Profile | null
  profileImageUrl: string | null;
  onLogout: () => void
}

interface ListItemProps {
  focus: boolean;
  label: string;
  className?: string;
  onClick?: () => void;
}

export const ListItem = ({ focus, label, className }: ListItemProps) => (
    <div
      className={clsx("flex justify-center cursor-pointer", className)}
    >
      <p
        className={clsx(
          "text-[16px] text-center text-[#81403C]",
          focus && "text-[#E18883]"
        )}
      >
        {label}
      </p>
    </div>
  );

export const StyledButton = ({ focus, label, className, onClick }: ListItemProps) => (
    <button
      type='button'
      onClick={onClick}
      className={clsx(
        "bg-none border-none cursor-pointer", // ← ボタンスタイルリセット
        className
      )}
    >
      <p
        className={clsx(
          "text-[16px] font-normal text-center text-(--text)",
          focus && "text-[#E18883]"
        )}
      >
        {label}
      </p>
    </button>
  );

const MenuLink =({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link href={href} className="block">
      {children}
    </Link>
  );
}

export const HeaderUI = ({ profile, profileImageUrl, onLogout }: HeaderUIProps) => {

  return (
    <header className={`w-[92%] mx-auto pt-4 h-12`}>
      <div className='flex justify-between'>
        <Link href='/'><AppLogo width="80px"/></Link>
        <nav>
        <ul className='flex gap-6'>
          <li>
            { profile ? (
                  <Link href={`/user`}>
                    { profileImageUrl ?
                    <ShapeImage
                      alt='ユーザーイメージ'
                      shape="circle"
                      src={profileImageUrl}
                      width={24}
                      height={24}
                      header
                      aliaLabel='ユーザーイメージ'
                    />
                    :
                    <AccountCircleIcon size={24} color='var(--text)' data-testid="profile-image" ariaLabel='ユーザーページへ'/>
                    }
                  </Link>
                ):(
                  <Link href="/login">
                    <NoAccountsIcon size={24} color='var(--text)' data-testid="profile-noimage" ariaLabel='ログインページへ'/>
                  </Link>
                )
            }
          </li>
          <li>
            <Link href='/newTodo'><CreateIcon size={24} color='var(--text)' ariaLabel='todo作成ページへ'/></Link>
          </li>
          <li>
          { profile ?(
              <Link href={`/todo`}>
                <ChecklistIcon size={24} color='var(--text)' ariaLabel='todoページへ'/>
              </Link>
            ):(
              <Link href="/auth/login">
                <ChecklistIcon size={24} color='var(--text)' ariaLabel='サインインへ'/>
              </Link>
            )
          }
          </li>
          <li>
          <Menu as="div" className="relative font-(--font-base)">
            <MenuButton className="block border-none p-0 bg-none cursor-pointer">
                <SettingsIcon size={24} color='var(--text)' dataTestId="settings-menu" ariaLabel='設定メニュー'/>
            </MenuButton>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems data-testid="settings-menu-items" className="absolute z-5000 right-0 w-[180px] mt-2 origin-top-right bg-[rgba(250,250,250,0.4)] bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-100 rounded-4xl shadow-[0_0_10px_rgba(80,62,62,0.25)]/10 outline-0 focus:outline-none">
              <div className="relative">
                <ul className='py-6 px-4 flex flex-col gap-6'>
                { profile ? (
                  <>
                    <MenuItem as="li">
                      {({ focus }) => (
                        <MenuLink href={`/user/setting`}>
                            <div className='flex gap-2 items-center'>
                              <PersonIcon size={20} color={focus ? 'var(--borderDash)' : 'var(--text)'} ariaLabel='ユーザー設定'/>
                              <ListItem
                                label="ユーザー設定"
                                focus={focus}
                              />
                            </div>
                        </MenuLink>
                      )}
                    </MenuItem>
                    <MenuItem as="li">
                      {({ focus }) => (
                        <MenuLink href={`/reward/new`}>
                            <div className='flex items-center gap-2'>
                              <StarIcon size={20} color={focus ? 'var(--borderDash)' : 'var(--text)'} ariaLabel='ご褒美設定'/>
                              <ListItem
                                label="ご褒美設定"
                                focus={focus}
                              />
                            </div>
                        </MenuLink>
                      )}
                    </MenuItem>
                    <MenuItem as="li">
                      {({ focus }) => (
                        <MenuLink href={`/reward/got`}>
                            <div className='flex items-center gap-2'>
                              <EmojiEventsIcon size={20} color={focus ? 'var(--borderDash)' : 'var(--text)'} ariaLabel='ご褒美獲得記録'/>
                              <ListItem
                                label="ご褒美獲得記録"
                                focus={focus}
                              />
                            </div>
                        </MenuLink>
                      )}
                    </MenuItem>
                    <MenuItem as="li">
                    <div className='h-px mt-px mb-px bg-(--text) opacity-[0.35]'/>
                    </MenuItem>
                    <MenuItem as="li">
                      {({ focus }) => (
                        <div className='flex items-center gap-2'>
                          <LogoutIcon size={20} color={focus ? 'var(--borderDash)' : 'var(--text)'} ariaLabel='ログアウト'/>
                          <StyledButton onClick={onLogout} label='ログアウト' focus={focus} />
                        </div>
                      )}
                    </MenuItem>
                  </>
                ):(
                  <Link href="/signin">
                    <p className='text-[16px] font-medium text-(--placeholder) hover:text-(--text)'>ログイン</p>
                  </Link>
                )}
                </ul>
                </div>
              </MenuItems>
            </Transition>
          </Menu>
          </li>
        </ul>
        </nav>
      </div>
    </header>
  )
}


