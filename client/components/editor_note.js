import CKEditor from 'react-ckeditor-component';
import React, { Component } from 'react';

export default class Editor extends Component {
    constructor(props) {
        super(props);
        this.updateContent = this.updateContent.bind(this);
        this.state = {
            content: props.content,
        }
    }

    updateContent(newContent) {
        this.setState({
            content: newContent
        })
    }

    onChange = (evt) => {
      console.log("onChange fired with event info: ", evt);
      var newContent = evt.editor.getData();
      this.props.onChange(newContent);
      this.setState({
        content: newContent
      })
    }

    onResizer(evt){
        evt.editor.resize("100%", 300);
        document.getElementById("cke_editor1").style.marginTop = "58px";
        document.getElementsByClassName("p10")[0].style.width = "100%";
        document.getElementsByClassName("cke_editable")[0].innerHTML=this.state.content;
      }

    onBlur(evt){
      console.log("onBlur event called with event info: ", evt);
    }

    afterPaste(evt){
      console.log("afterPaste event called with event info: ", evt);
    }

    render() {
        return (
            <CKEditor
              style={{height: '100%'}}
              activeClass="p10"
              content={this.state.content}
              events={{
                "instanceReady": this.onResizer,
                "blur": this.onBlur,
                "afterPaste": this.afterPaste,
                "change": this.onChange,
              }}
             />
        )
    }
}
