// global
import React, { Children, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
// components
import { Table, Button, Icon } from 'semantic-ui-react';
// stylesheets
import styles from './List.module.scss';

function List(props) {
  const { parameters, data, loading, children, isSearch, onClickIncreaseListLimit } = props;

  const renderCell = (property, row) => {
    return !_.isNull(row) && !_.isUndefined(row) ? row[`${property}`] : '--';
  };
  const tableHeader = (parameters) => {
    return (
      <Table.Header>
        <Table.Row>
          {parameters.map((elem) => (
            <Table.HeaderCell key={elem.column} width={elem.width}>
              {elem.column}
            </Table.HeaderCell>
          ))}
          {children && <Table.HeaderCell width={2} />}
        </Table.Row>
      </Table.Header>
    );
  };

  const tableBody = (data) => {
    return (
      <Table.Body>
        {data.map(
          (row) =>
            !_.isNull(row) &&
            !_.isUndefined(row) && (
              <Table.Row key={row.id ? row.id : row}>
                {parameters.map((elem) => {
                  const { width, property } = elem;
                  return (
                    <Table.Cell key={property} width={width}>
                      <span>{renderCell(property, row)}</span>
                    </Table.Cell>
                  );
                })}
                {children && (
                  <Table.Cell textAlign="center" width={2}>
                    {Children.map(children, (child) => {
                      if (isValidElement(child)) {
                        return cloneElement(child, { row: row });
                      }
                    })}
                  </Table.Cell>
                )}
              </Table.Row>
            ),
        )}
        {!isSearch && (
          <Table.Row>
            <Table.Cell colSpan="8" style={{ textAlign: 'center' }}>
              <Button
                style={{
                  borderRadius: '100% !important',
                  padding: '15px',
                  fontSize: '20px',
                }}
                content={
                  <Icon
                    name={loading ? 'circle notch' : 'plus'}
                    loading={loading}
                    style={{ margin: 0 }}
                  />
                }
                onClick={onClickIncreaseListLimit}
              />
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    );
  };

  return (
    <Table className={styles.tableList}>
      {tableHeader(parameters)}
      {tableBody(data)}
    </Table>
  );
}

List.propTypes = {
  dispatch: PropTypes.func,
  onClickIncreaseListLimit: PropTypes.func,
  data: PropTypes.array,
  parameters: PropTypes.array,
  loading: PropTypes.bool,
  isSearch: PropTypes.bool,
  children: PropTypes.node,
};

export default List;
