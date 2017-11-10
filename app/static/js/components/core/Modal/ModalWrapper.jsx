import {Modal, ModalClose, ModalHeader, ModalTitle, ModalBody } from 'react-modal-bootstrap'
import React, { PropTypes } from 'react'
import RecipeEditForm from '../Form/RecipeEditForm.jsx'

const ModalWrapper = React.createClass({

  propTypes: {
    headerTitle: PropTypes.string,
    onClose: PropTypes.func,
    onUpdate: PropTypes.func,
    onRevert: PropTypes.func,
    recipe: PropTypes.object,
    isOpen: PropTypes.bool,
    modalBody: PropTypes.object
  },

  renderHeader() {
    return (
      <ModalHeader>
        <ModalClose onClick={this.props.onClose}/>
        <ModalTitle> {this.props.headerTitle} </ModalTitle>
      </ModalHeader>
    )
  },

  renderBody() {
    return (
      <ModalBody>
        <RecipeEditForm
          recipe = { this.props.recipe }
          onUpdate = { this.props.onUpdate }
        />
      </ModalBody>
    )
  },

  renderFooter() {
    return (
      <ModalFooter>
        <ButtonGroupModal 
          onUpdate = { this.props.onUpdate }
          onRevert = { this.props.onRevert }
          recipe = { this.props.recipe }
        />
      </ModalFooter>
    )
  },


  render() {
    return(
      <Modal isOpen = { this.props.isOpen} onReuqestHide = { this.props.onClose }>
        { this.renderHeader()}
        { this.renderBody() }
        {/* { this.renderFooter() } */}
      </Modal>
    )
  }
})

export default ModalWrapper