/*
 * @Author: Chenxu
 * @Date: 2023-01-12 13:24:44
 * @LastEditTime: 2023-02-07 11:08:04
 * @Msg: Nothing
 */

import { sendEmail } from "@/apis/index";
import { Cell, Form, Navbar, Popup, Textarea } from '@taroify/core';
import { BaseEventOrig, Button, FormProps, Input } from "@tarojs/components";
import { FormElement } from "@tarojs/runtime";
import Taro from "@tarojs/taro";
import { FC, FormEvent, useEffect, useRef, useState } from "react";
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

  const formRef = useRef<HTMLFormElement>()

  const sendEmailHadnle = async (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    const dataValue = event.detail.value!
    const hasOneKeyValue = Object.keys(dataValue).some(item => {
      return dataValue[item]
    })
    if (!hasOneKeyValue) {
      Taro.showToast({ icon: 'none', title: '邮件主题或内容至少输入一个！' })
      return
    }
    Taro.showLoading({ title: '发送中..',mask: true })
    try {
      await sendEmail({
        ...dataValue,
        MailToList: [openEmail]
      })
      Taro.showToast({ icon: 'success', title: '发送成功' })
    } catch (error) {
      Taro.showToast({ icon: 'success', title: '发送失败' })
      console.log(error)
    }
    formRef.current?.reset()
    setOpen(false)
    onClose()
  }

  return (
    <Popup open={open} rounded onClose={() => {
      formRef.current?.reset()
      onClose()
      setOpen(false)
    }} placement="bottom" style={{ height: '80%' }} >
      <Popup.Close />
      <Popup.Backdrop closeable />

      <Form ref={formRef} onSubmit={sendEmailHadnle} style={{ '--form-label-width': '60px' }}>

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
              <Textarea style={{ height: '500px' }} placeholder="请输入邮件内容" />
            </Form.Control>
          </Form.Item>
        </Cell.Group>
      </Form>
    </Popup>

  )
}