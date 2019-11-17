import TreeList from '../../../src/list/TreeList.mjs';

/**
 * @class Docs.app.view.ExamplesTreeList
 * @extends Neo.list.TreeList
 */
class ExamplesTreeList extends TreeList {
    static getConfig() {return {
        /**
         * @member {String} className='Docs.app.view.ExamplesTreeList'
         * @private
         */
        className: 'Docs.app.view.ExamplesTreeList',
        /**
         * @member {String} ntype='examples-treelist'
         * @private
         */
        ntype: 'examples-treelist',
        /**
         * @member {String[]} cls=['docs-examples-treelist', 'neo-tree-list', 'neo-list-container', 'neo-list']
         */
        cls: [
            'docs-examples-treelist',
            'neo-tree-list',
            'neo-list-container',
            'neo-list'
        ]
    }}

    /**
     *
     */
    onConstructed() {
        super.onConstructed();

        let me = this;

        Neo.Xhr.promiseJson({
            url: Neo.isExperimental ?
                '../docs/examples.json' :
                '../../docs/examples.json'
        }).then(data => {
            let vdom     = me.vdom,
                itemRoot = me.getListItemsRoot();

            me.store.items = data.json;
            itemRoot = me.createItems(null, itemRoot, 0);

            me.vdom = vdom;
        });
    }
}

Neo.applyClassConfig(ExamplesTreeList);

export {ExamplesTreeList as default};