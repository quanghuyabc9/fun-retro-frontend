import React, { useEffect, useState } from 'react';
import { APIAuth, APIAuthDeleteCall, APIAuthPostCall, APIAuthPutCall } from '../../configs/APIAuth';
import BoardDetail from "../../components/BoardDetail";
import AppTheme from "../../themes/AppTheme";
import Header from "../../components/Header";
import BoardDetailContext from "../../components/BoardDetailContext";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { CARD_TYPES } from "../../configs/constraints";

export default function BoardDetailPage() {
   const [cards, setCards] = useState({
      wentWell: [],
      toImprove: [],
      actionItems: [],
   });
   const { id } = useParams();

   const updateChangeAddOrDone = (card) => {
      if (card.isNew) {
         card.isNew = false;
      }
      switch (card._column) {
         case CARD_TYPES.WENT_WELL:
            const wentWellCardTmps = cards.wentWell.slice();
            wentWellCardTmps[card.idx] = card;
            setCards({
               wentWell: wentWellCardTmps,
               toImprove: cards.toImprove,
               actionItems: cards.actionItems,
            });
            break;
         case CARD_TYPES.TO_IMPROVE:
            const toImproveCardTmps = cards.toImprove.slice();
            toImproveCardTmps[card.idx] = card;
            setCards({
               wentWell: cards.wentWell,
               toImprove: toImproveCardTmps,
               actionItems: cards.actionItems,
            });
            break;
         case CARD_TYPES.ACTION_ITEMS:
            const actionItemsCardTmps = cards.actionItems.slice();
            actionItemsCardTmps[card.idx] = card;
            setCards({
               wentWell: cards.wentWell,
               toImprove: toImproveCardTmps,
               actionItems: actionItemsCardTmps,
            })
            break;
         default:
      }
   }

   const handleClickAddOrDone = (card) => {
      const cardNew = {
         _column: card._column,
         content: card.content,
         boardId: card.boardId
      };
      if (card.isNew) {
         APIAuthPostCall('cards/add', JSON.parse(localStorage.getItem("accessToken")), cardNew)
            .then(res => {
               updateChangeAddOrDone(card);
            }).catch(err => {
               console.log(err);
            })
      } else {
         cardNew.id = card.id;
         APIAuthPutCall('cards/update', JSON.parse(localStorage.getItem("accessToken")), cardNew)
            .then(res => {
               updateChangeAddOrDone(card);
            }).catch(err => {
               console.log(err);
            })
      }
   }

   useEffect(() => {
      APIAuth(`cards/find-all/${id}`, JSON.parse(localStorage.getItem('accessToken')))
         .then(res => {
            let wentWellCardsTmp = [];
            let toImproveCardsTmp = [];
            let actionItemsCardsTmp = [];
            for (let i = 0; i < res.data.length; i++) {
               const card = res.data[i];
               card.isNew = false;
               switch (card._column) {
                  case CARD_TYPES.WENT_WELL:
                     card.idx = wentWellCardsTmp.length;
                     wentWellCardsTmp.push(card);
                     break;
                  case CARD_TYPES.TO_IMPROVE:
                     card.idx = toImproveCardsTmp.length;
                     toImproveCardsTmp.push(card);
                     break;
                  case CARD_TYPES.ACTION_ITEMS:
                     card.idx = actionItemsCardsTmp.length;
                     actionItemsCardsTmp.push(card);
                     break;
                  default:
               }
            }
            setCards({
               wentWell: wentWellCardsTmp,
               toImprove: toImproveCardsTmp,
               actionItems: actionItemsCardsTmp,
            })
         })
         .catch(err => {
            console.log(err);
         })
   }, []);

   const handleClickAddWentWellCard = () => {
      const n = cards.wentWell.length;
      const wentWellCardsTmp = cards.wentWell.slice();
      setCards({
         wentWell: wentWellCardsTmp.concat([{
            idx: n,
            isNew: true,
            id: -1,
            _column: CARD_TYPES.WENT_WELL,
            content: "",
            boardId: id
         }]),
         toImprove: cards.toImprove,
         actionItems: cards.actionItems,
      });
   }

   const handleClickAddToImproveCard = () => {
      const n = cards.toImprove.length;
      const toImproveCardsTmp = cards.toImprove.slice();
      setCards({
         wentWell: cards.wentWell,
         toImprove: toImproveCardsTmp.concat([{
            idx: n,
            isNew: true,
            id: -1,
            _column: CARD_TYPES.TO_IMPROVE,
            content: "",
            boardId: id
         }]),
         actionItems: cards.actionItems,
      });
   }

   const handleClickAddActionItemsCard = () => {
      const n = cards.actionItems.length;
      const actionItemsCardsTmp = cards.actionItems.slice();
      setCards({
         wentWell: cards.wentWell,
         toImprove: cards.toImprove,
         actionItems: actionItemsCardsTmp.concat([{
            idx: n,
            isNew: true,
            id: -1,
            _column: CARD_TYPES.ACTION_ITEMS,
            content: "",
            boardId: id
         }]),
      });
   }

   const updateChangeDelete = (card) => {
      switch (card._column) {
         case CARD_TYPES.WENT_WELL:
            const wentWellCardsTmp = cards.wentWell.slice();
            for (let i = card.idx + 1; i < wentWellCardsTmp.length; i++) {
               wentWellCardsTmp[i].idx--;
            }
            wentWellCardsTmp.splice(card.idx, 1);
            setCards({
               wentWell: wentWellCardsTmp,
               toImprove: cards.toImprove,
               actionItems: cards.actionItems,
            })
            break;
         case CARD_TYPES.TO_IMPROVE:
            const toImproveCardsTmp = cards.toImprove.slice();
            for (let i = card.idx + 1; i < toImproveCardsTmp.length; i++) {
               toImproveCardsTmp[i].idx--;
            }
            toImproveCardsTmp.splice(card.idx, 1);
            setCards({
               wentWell: cards.wentWell,
               toImprove: toImproveCardsTmp,
               actionItems: cards.actionItems,
            })
            break;
         case CARD_TYPES.ACTION_ITEMS:
            const actionItemsCardsTmp = cards.actionItems.slice();
            for (let i = card.idx + 1; i < actionItemsCardsTmp.length; i++) {
               actionItemsCardsTmp[i].idx--;
            }
            actionItemsCardsTmp.splice(card.idx, 1);
            setCards({
               wentWell: cards.wentWell,
               toImprove: cards.toImprove,
               actionItems: actionItemsCardsTmp,
            })
            break;
         default:
      }
   }

   const handleClickDeleteCard = (card) => {
      if (!card.isNew) {
         APIAuthDeleteCall(`cards/${card.id}`, JSON.parse(localStorage.getItem("accessToken")))
            .then(res => {
               updateChangeDelete(card);
            }).catch(err => {
               console.log(err);
            })
      }
      else
         updateChangeDelete(card);
   }

   return (
      <MuiThemeProvider theme={AppTheme}>
         <CssBaseline />
         <Header />
         <BoardDetailContext 
            boardId = {id}/>
         <BoardDetail
            cards={cards}
            handleClickAddOrDone={handleClickAddOrDone}
            handleClickAddWentWellCard={handleClickAddWentWellCard}
            handleClickAddToImproveCard={handleClickAddToImproveCard}
            handleClickAddActionItemsCard={handleClickAddActionItemsCard}
            handleClickDeleteCard={handleClickDeleteCard} />
      </MuiThemeProvider>
   )
}