/*
 * @Author: Chenxu
 * @Date: 2023-01-12 13:24:44
 * @LastEditTime: 2023-02-02 15:28:12
 * @Msg: Nothing
 */

import { sendEmail } from "@/apis/index";
import { Cell, Form, Navbar, Popup, Textarea } from '@taroify/core';
import { BaseEventOrig, Button, FormProps, Input } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { FC, useEffect, useState } from "react";
import "./index.scss";

interface OpenEmailProps {
  openEmail: string
  onClose: () => void
}

export const OpenEmail: FC<OpenEmailProps> = ({ openEmail, onClose }) => {

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!!openEmail) setOpen(true)
  }, [openEmail])


  const sendEmailHadnle = async (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    console.log(event.detail.value)
    try {
      await sendEmail({
        ...event.detail.value,
        MailToList: [openEmail]
      })
      Taro.showToast({ icon: 'success', title: '发送成功' })
      setOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Popup open={open} rounded onClose={() => {
      onClose()
      setOpen(false)
    }} placement="bottom" style={{ height: '80%' }} >
      <Popup.Close />
      <Popup.Backdrop closeable />

      <Form onSubmit={sendEmailHadnle} style={{ '--form-label-width': '60px' }}>

        <Navbar>
          <Navbar.Title>发送邮件</Navbar.Title>
          <Navbar.NavRight >
            <Button style={{ color: '#2039D4' }} formType="submit">发送</Button>
          </Navbar.NavRight>
        </Navbar>

        <Cell.Group style={{ marginTop: '20px' }} inset>
          <Form.Item name='subject'>
            <Form.Label>主题</Form.Label>
            <Form.Control>
              <Input placeholder="请输入主题" />
            </Form.Control>
          </Form.Item>
          <Form.Item name='body'>
            <Form.Label>邮件内容</Form.Label>
            <Form.Control>
              <Textarea style={{ height: "calc(100vh - 200px)" }} placeholder="请输入邮件内容" />
            </Form.Control>
          </Form.Item>
        </Cell.Group>
      </Form>
    </Popup>

  )
}